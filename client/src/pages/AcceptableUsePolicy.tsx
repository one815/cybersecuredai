import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function AcceptableUsePolicy() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-orange-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-orange-400 text-orange-400">
                <FileText className="h-4 w-4 mr-2" />
                Acceptable Use Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-400 bg-clip-text text-transparent">
                Acceptable Use Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                CyberSecured AI Platform Usage Guidelines
              </p>
              <p className="text-orange-400 font-semibold">
                Effective Date: September 6, 2025 | Version 2.0
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Usage Guidelines Notice */}
          <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 font-semibold mb-2">📋 Usage Guidelines:</p>
                  <p className="text-gray-300">
                    This Acceptable Use Policy defines the appropriate and prohibited uses of CyberSecured AI services. 
                    Users must comply with these guidelines to maintain access to our cybersecurity platform and services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">1. Policy Overview</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">1.1 Purpose and Scope</h3>
              <p className="text-gray-300 mb-4">
                This Acceptable Use Policy (AUP) governs the use of all CyberSecured AI services, including:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Cybersecurity monitoring and threat detection platforms</li>
                <li>Incident response and forensic analysis tools</li>
                <li>Compliance management and reporting systems</li>
                <li>API access and integrations</li>
                <li>Support services and documentation</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.2 Policy Application</h3>
              <p className="text-gray-300 mb-4">This policy applies to:</p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Direct Users:</strong> Individuals with direct access to CyberSecured AI services</li>
                <li><strong>Organizational Users:</strong> Organizations and their authorized representatives</li>
                <li><strong>API Users:</strong> Third-party integrations and automated systems</li>
                <li><strong>End Users:</strong> Individuals whose data is processed through our services</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.3 Enforcement Authority</h3>
              <p className="text-gray-300 mb-4">CyberSecured AI reserves the right to:</p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Monitor usage for policy compliance</li>
                <li>Investigate suspected policy violations</li>
                <li>Take corrective action including service suspension</li>
                <li>Cooperate with law enforcement when legally required</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                2. Permitted Uses
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Authorized Cybersecurity Activities</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Threat Monitoring:</strong> Monitoring networks and systems for security threats</li>
                <li><strong>Incident Response:</strong> Investigating and responding to security incidents</li>
                <li><strong>Vulnerability Management:</strong> Identifying and managing security vulnerabilities</li>
                <li><strong>Compliance Reporting:</strong> Generating reports for regulatory compliance</li>
                <li><strong>Security Research:</strong> Legitimate security research and analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Educational and Training Purposes</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Cybersecurity Training:</strong> Using services for educational and training purposes</li>
                <li><strong>Academic Research:</strong> Research activities by educational institutions</li>
                <li><strong>Professional Development:</strong> Skills development and certification preparation</li>
                <li><strong>Knowledge Sharing:</strong> Sharing insights and best practices within organizations</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.3 Business Operations</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Risk Assessment:</strong> Evaluating and managing cybersecurity risks</li>
                <li><strong>Audit Support:</strong> Supporting internal and external audits</li>
                <li><strong>Vendor Assessment:</strong> Evaluating third-party security risks</li>
                <li><strong>Strategic Planning:</strong> Developing cybersecurity strategies and policies</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                3. Prohibited Activities
              </h2>
              
              <Card className="bg-red-500/10 border-red-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-200 font-semibold mb-2">Strictly Prohibited:</p>
                    <p className="text-gray-300">
                      The following activities are strictly prohibited and may result in immediate service termination 
                      and legal action.
                    </p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">3.1 Illegal Activities</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Unauthorized access to systems, networks, or data</li>
                <li>Distribution of malware, viruses, or malicious code</li>
                <li>Data theft or unauthorized data exfiltration</li>
                <li>Identity theft or impersonation</li>
                <li>Violation of intellectual property rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Abuse of Services</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Excessive use that impacts service performance</li>
                <li>Attempting to circumvent security controls</li>
                <li>Reverse engineering or unauthorized modification</li>
                <li>Sharing access credentials with unauthorized parties</li>
                <li>Using services for competitive intelligence gathering</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.3 Harmful Content</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Uploading or transmitting illegal content</li>
                <li>Harassment, threats, or abusive behavior</li>
                <li>Discrimination based on protected characteristics</li>
                <li>Content that violates privacy rights</li>
                <li>Spam, unsolicited communications, or phishing</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">4. Enforcement and Violations</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Violation Response</h3>
              <p className="text-gray-300 mb-4">
                Violations of this policy may result in the following actions:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Warning:</strong> Written notice of policy violation</li>
                <li><strong>Service Limitation:</strong> Temporary restriction of access</li>
                <li><strong>Service Suspension:</strong> Temporary suspension of services</li>
                <li><strong>Account Termination:</strong> Permanent termination of services</li>
                <li><strong>Legal Action:</strong> Referral to law enforcement when appropriate</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Investigation Process</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Prompt investigation of reported violations</li>
                <li>Fair and impartial review of evidence</li>
                <li>Opportunity for users to respond to allegations</li>
                <li>Documentation of findings and actions taken</li>
                <li>Appeal process for disputed decisions</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-orange-400 mb-4">5. Reporting and Contact</h2>
              <p className="text-gray-300 mb-4">
                To report suspected policy violations or seek clarification on acceptable use:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Security Incidents:</strong> security@cybersecuredai.com</li>
                <li><strong>Abuse Reports:</strong> abuse@cybersecuredai.com</li>
                <li><strong>Policy Questions:</strong> compliance@cybersecuredai.com</li>
                <li><strong>General Contact:</strong> legal@cybersecuredai.com</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-orange-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                Policy Compliance Contact
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Compliance Officer:</strong> compliance@cybersecuredai.com</p>
                <p><strong>Abuse Team:</strong> abuse@cybersecuredai.com</p>
                <p><strong>Legal Team:</strong> legal@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For urgent policy violations or security incidents, please contact us immediately. 
                  Non-urgent policy questions are typically responded to within 2-3 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}