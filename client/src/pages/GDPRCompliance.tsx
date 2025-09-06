import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, FileText, CheckCircle } from "lucide-react";

export default function GDPRCompliance() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-green-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-green-400 text-green-400">
                <Shield className="h-4 w-4 mr-2" />
                GDPR Compliance
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                GDPR Compliance Statement
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                General Data Protection Regulation (EU) 2016/679
              </p>
              <p className="text-green-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* GDPR Compliant Notice */}
          <Card className="mb-8 bg-green-500/10 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-200 font-semibold mb-2">✓ GDPR Compliant:</p>
                  <p className="text-gray-300">
                    CyberSecured AI is committed to full compliance with the General Data Protection Regulation 
                    for all European Union data subjects. This statement outlines our specific compliance measures 
                    and your rights under GDPR.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">1. Controller Information</h2>
              
              <Card className="bg-slate-800/50 border-gray-600 p-6 mb-4">
                <h4 className="text-white font-semibold mb-3">Data Controller:</h4>
                <div className="text-gray-300 space-y-1">
                  <p>CyberSecured AI</p>
                  <p>395 Pitchfork Trail Suite 902</p>
                  <p>Willow Park, TX 76087</p>
                  <p>United States</p>
                </div>
              </Card>

              <Card className="bg-slate-800/50 border-gray-600 p-6 mb-4">
                <h4 className="text-white font-semibold mb-3">EU Representative:</h4>
                <div className="text-gray-300 space-y-1">
                  <p>Available upon request for EU data subjects</p>
                  <p>Contact: gdpr@cybersecuredai.com</p>
                </div>
              </Card>

              <Card className="bg-slate-800/50 border-gray-600 p-6">
                <h4 className="text-white font-semibold mb-3">Data Protection Officer (DPO):</h4>
                <div className="text-gray-300 space-y-1">
                  <p>Email: dpo@cybersecuredai.com</p>
                  <p>Phone: Available upon request</p>
                </div>
              </Card>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">2. Legal Basis for Processing</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Primary Legal Bases</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Legitimate Interest (Article 6(1)(f)):</strong> Cybersecurity services and threat protection</li>
                <li><strong>Contract Performance (Article 6(1)(b)):</strong> Service delivery and customer support</li>
                <li><strong>Legal Obligation (Article 6(1)(c)):</strong> Regulatory compliance and reporting</li>
                <li><strong>Consent (Article 6(1)(a)):</strong> Marketing communications and optional features</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Special Category Data</h3>
              <p className="text-gray-300 mb-4">
                When processing special category personal data, we rely on:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Explicit Consent (Article 9(2)(a)):</strong> When specifically provided by data subjects</li>
                <li><strong>Substantial Public Interest (Article 9(2)(g)):</strong> Cybersecurity and fraud prevention</li>
                <li><strong>Vital Interests (Article 9(2)(c)):</strong> Emergency incident response</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">3. Your Rights Under GDPR</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-blue-500/10 border-blue-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-blue-200 font-semibold mb-2">Access Rights</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Right to access personal data</li>
                        <li>• Right to data portability</li>
                        <li>• Right to be informed</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-purple-200 font-semibold mb-2">Control Rights</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Right to rectification</li>
                        <li>• Right to erasure ("right to be forgotten")</li>
                        <li>• Right to restrict processing</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">3.1 Exercising Your Rights</h3>
              <p className="text-gray-300 mb-4">
                To exercise any of your GDPR rights, please contact us at:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Email:</strong> gdpr@cybersecuredai.com</li>
                <li><strong>Subject Line:</strong> "GDPR Request - [Type of Request]"</li>
                <li><strong>Response Time:</strong> Within 30 days (extendable to 90 days for complex requests)</li>
                <li><strong>Verification:</strong> Identity verification required for security purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Right to Lodge a Complaint</h3>
              <p className="text-gray-300">
                You have the right to lodge a complaint with your local supervisory authority if you believe 
                your data protection rights have been violated. You can find contact information for EU 
                supervisory authorities at: https://edpb.europa.eu/about-edpb/board/members_en
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">4. Data Processing Activities</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Categories of Personal Data</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Identity Data:</strong> Name, email address, phone number, job title</li>
                <li><strong>Technical Data:</strong> IP address, device information, usage data</li>
                <li><strong>Security Data:</strong> Authentication credentials, access logs, security events</li>
                <li><strong>Communication Data:</strong> Support requests, feedback, correspondence</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Processing Purposes</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Service Provision:</strong> Delivering cybersecurity services and support</li>
                <li><strong>Security Protection:</strong> Threat detection, incident response, fraud prevention</li>
                <li><strong>Compliance:</strong> Meeting regulatory requirements and audit obligations</li>
                <li><strong>Communication:</strong> Customer support, service notifications, security alerts</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Data Retention</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <table className="w-full text-gray-300 text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2">Data Category</th>
                      <th className="text-left p-2">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Account Data</td>
                      <td className="p-2">7 years after account closure</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Security Logs</td>
                      <td className="p-2">2 years for analysis purposes</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Support Records</td>
                      <td className="p-2">3 years after resolution</td>
                    </tr>
                    <tr>
                      <td className="p-2">Marketing Consent</td>
                      <td className="p-2">Until consent withdrawn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">5. International Data Transfers</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Transfer Mechanisms</h3>
              <p className="text-gray-300 mb-4">
                When transferring personal data outside the EU/EEA, we ensure adequate protection through:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Standard Contractual Clauses (SCCs):</strong> EU Commission approved clauses</li>
                <li><strong>Adequacy Decisions:</strong> Transfers to countries with adequate protection</li>
                <li><strong>Certification Programs:</strong> Privacy frameworks and certifications</li>
                <li><strong>Binding Corporate Rules:</strong> Internal data protection rules</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Third Country Processing</h3>
              <p className="text-gray-300 mb-4">
                We primarily process data in the United States with appropriate safeguards:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Standard Contractual Clauses with all processors</li>
                <li>Technical and organizational security measures</li>
                <li>Regular compliance audits and assessments</li>
                <li>Transparent privacy impact assessments</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">6. Security Measures and Breach Response</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Technical Safeguards</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Encryption:</strong> AES-256 encryption for data at rest and in transit</li>
                <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
                <li><strong>Network Security:</strong> Firewalls, intrusion detection, and monitoring</li>
                <li><strong>Data Minimization:</strong> Collection limited to necessary purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Organizational Measures</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Staff Training:</strong> Regular GDPR and privacy training programs</li>
                <li><strong>Privacy by Design:</strong> Built-in privacy protection in all systems</li>
                <li><strong>Regular Audits:</strong> Internal and external privacy compliance audits</li>
                <li><strong>Vendor Management:</strong> GDPR compliance requirements for all processors</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.3 Breach Notification</h3>
              <Card className="bg-red-500/10 border-red-500/30 p-4">
                <p className="text-gray-300 text-sm">
                  In the event of a personal data breach likely to result in high risk to your rights and freedoms, 
                  we will notify you within 72 hours of becoming aware of the breach, as required by Article 33 GDPR.
                </p>
              </Card>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-green-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                GDPR Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Data Protection Officer:</strong> dpo@cybersecuredai.com</p>
                <p><strong>GDPR Requests:</strong> gdpr@cybersecuredai.com</p>
                <p><strong>Privacy Team:</strong> privacy@cybersecuredai.com</p>
                <p><strong>Legal Team:</strong> legal@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For all GDPR-related questions or to exercise your rights under GDPR, please contact our 
                  Data Protection Officer. We respond to all requests within 30 days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}