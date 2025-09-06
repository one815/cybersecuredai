import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";

export default function TermsOfUse() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-blue-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-blue-400 text-blue-400">
                <Scale className="h-4 w-4 mr-2" />
                Terms of Use
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Terms of Use
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                End-User License Agreement and Terms of Use
              </p>
              <p className="text-blue-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Agreement Notice */}
          <Card className="mb-8 bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-200 font-semibold mb-2">Important:</p>
                  <p className="text-gray-300">
                    By accessing and using CyberSecured AI platform, you accept and agree to be bound by 
                    the terms and provisions of this Terms of Use agreement. These Terms of Use constitute 
                    a binding legal agreement between you and CyberSecure AI Ltd.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-300 mb-4">
                By accessing and using CyberSecured AI platform, you accept and agree to be bound by the terms 
                and provision of this Terms of Use agreement. These Terms of Use constitute a binding legal 
                agreement between you and CyberSecure AI Ltd.
              </p>
              
              <Card className="bg-red-500/10 border-red-500/30 p-4">
                <p className="text-red-200 font-semibold mb-2">Important:</p>
                <p className="text-gray-300 text-sm">
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </Card>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">2. Software License Grant</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 License Scope</h3>
              <p className="text-gray-300 mb-4">
                Subject to your compliance with these Terms of Use, CyberSecure AI Ltd. grants you a limited, 
                non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Access and use the CyberSecured AI platform</li>
                <li>Use the cybersecurity tools and features provided</li>
                <li>Access threat intelligence and security analytics</li>
                <li>Generate compliance reports and documentation</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 License Restrictions</h3>
              <p className="text-gray-300 mb-4">You may NOT:</p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Copy, modify, distribute, sell, or lease any part of our software</li>
                <li>Reverse engineer, decompile, or attempt to extract source code</li>
                <li>Remove or modify any proprietary notices or labels</li>
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Interfere with or disrupt the platform or servers</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">3. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Our Proprietary Rights</h3>
              <p className="text-gray-300 mb-4">
                The CyberSecured AI platform, including all software, content, trademarks, and intellectual 
                property, is owned by CyberSecure AI Ltd. and is protected by copyright, trademark, and other 
                intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Your Content Rights</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Ownership:</strong> You retain ownership of content you upload or create</li>
                <li><strong>License to Us:</strong> You grant us a license to use your content for service provision</li>
                <li><strong>Compliance Data:</strong> Generated reports may include aggregated, anonymized data</li>
                <li><strong>Feedback:</strong> Any feedback provided becomes our property for improvement purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.3 Third-Party Content</h3>
              <p className="text-gray-300">
                The platform may include third-party threat intelligence, security tools, and integrations. 
                These remain the property of their respective owners and are used under appropriate licenses.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">4. User Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Account Security</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Credentials:</strong> Maintain confidentiality of login credentials</li>
                <li><strong>Multi-Factor Authentication:</strong> Enable and maintain MFA when required</li>
                <li><strong>Authorized Use:</strong> Ensure only authorized personnel access your account</li>
                <li><strong>Breach Reporting:</strong> Report suspected security breaches immediately</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Compliance Obligations</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Legal Compliance:</strong> Use the platform in compliance with applicable laws</li>
                <li><strong>Data Protection:</strong> Follow data protection and privacy requirements</li>
                <li><strong>Export Controls:</strong> Comply with export control regulations</li>
                <li><strong>Industry Standards:</strong> Adhere to relevant industry security standards</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Prohibited Activities</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Using the service for malicious or illegal purposes</li>
                <li>Attempting to gain unauthorized access to systems or data</li>
                <li>Violating the rights of others or applicable laws</li>
                <li>Transmitting viruses, malware, or harmful code</li>
                <li>Interfering with the normal operation of the service</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">5. Service Availability and Support</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Service Levels</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Uptime Target:</strong> 99.9% monthly uptime for core services</li>
                <li><strong>Maintenance Windows:</strong> Scheduled maintenance with advance notice</li>
                <li><strong>Emergency Updates:</strong> Immediate deployment for critical security patches</li>
                <li><strong>Performance Monitoring:</strong> Continuous monitoring and optimization</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Support Services</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Technical Support:</strong> Available during business hours</li>
                <li><strong>Emergency Support:</strong> 24/7 for critical security incidents</li>
                <li><strong>Documentation:</strong> Comprehensive user guides and knowledge base</li>
                <li><strong>Training:</strong> Available training resources and sessions</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">6. Limitation of Liability</h2>
              
              <Card className="bg-orange-500/10 border-orange-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-orange-200 font-semibold mb-2">Liability Limitations:</p>
                    <p className="text-gray-300 text-sm">
                      CyberSecure AI Ltd.'s total liability for any claims related to the service shall not exceed 
                      the amount paid by you for the service during the 12 months preceding the claim.
                    </p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">6.1 Disclaimer of Warranties</h3>
              <p className="text-gray-300 mb-4">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, 
                INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Indemnification</h3>
              <p className="text-gray-300">
                You agree to indemnify and hold harmless CyberSecure AI Ltd. from any claims, damages, or 
                expenses arising from your use of the service or violation of these terms.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">7. Term and Termination</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">7.1 Term</h3>
              <p className="text-gray-300 mb-4">
                These Terms of Use remain in effect while you use the CyberSecured AI platform and until 
                terminated by either party in accordance with the provisions herein.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">7.2 Termination Rights</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>By You:</strong> Cancel your account at any time with 30 days notice</li>
                <li><strong>By Us:</strong> Immediate termination for breach of terms or illegal activity</li>
                <li><strong>Data Retention:</strong> Data held for 90 days post-termination for transition</li>
                <li><strong>Survival:</strong> Certain provisions survive termination as specified</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">7.3 Effect of Termination</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>All rights and licenses granted to you immediately cease</li>
                <li>You must cease all use of the platform and services</li>
                <li>Accrued obligations and liabilities remain in effect</li>
                <li>Data export available for 90 days post-termination</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">8. General Provisions</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">8.1 Governing Law</h3>
              <p className="text-gray-300 mb-4">
                These Terms of Use are governed by the laws of the State of Texas, United States, without 
                regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">8.2 Dispute Resolution</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Informal Resolution:</strong> Good faith attempt to resolve disputes informally</li>
                <li><strong>Binding Arbitration:</strong> Disputes resolved through binding arbitration</li>
                <li><strong>Jurisdiction:</strong> Texas state or federal courts for enforcement</li>
                <li><strong>Class Action Waiver:</strong> No class action or collective proceedings</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">8.3 Modifications</h3>
              <p className="text-gray-300">
                We may modify these Terms of Use at any time. Material changes will be communicated with 
                30 days advance notice. Continued use after changes constitutes acceptance.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-blue-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                Terms of Use Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Legal Team:</strong> legal@cybersecuredai.com</p>
                <p><strong>License Questions:</strong> licensing@cybersecuredai.com</p>
                <p><strong>General Contact:</strong> support@cybersecuredai.com</p>
                <p><strong>Address:</strong> 395 Pitchfork Trail Suite 902, Willow Park, TX 76087</p>
                <p className="text-sm text-gray-400 mt-4">
                  For questions about these Terms of Use or licensing, please contact our legal team. 
                  We typically respond to inquiries within 2-3 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}