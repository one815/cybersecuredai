import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Shield, FileText, Users } from "lucide-react";

export default function FERPACompliance() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-blue-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-blue-400 text-blue-400">
                <GraduationCap className="h-4 w-4 mr-2" />
                FERPA Compliance
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                FERPA Compliance Statement
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Family Educational Rights and Privacy Act (20 U.S.C. § 1232g)
              </p>
              <p className="text-blue-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* FERPA Compliant Services */}
          <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 font-semibold mb-2">📚 FERPA Compliant Services:</p>
                  <p className="text-gray-300">
                    CyberSecured AI is committed to protecting student educational records in full compliance 
                    with the Family Educational Rights and Privacy Act (FERPA). We serve as a school official 
                    providing institutional services under FERPA's school official exception.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">1. FERPA Overview and Compliance</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">1.1 What is FERPA</h3>
              <p className="text-gray-300 mb-4">
                The Family Educational Rights and Privacy Act (FERPA) is a federal law that protects the privacy 
                of student education records. FERPA applies to all educational institutions that receive federal 
                funding and governs:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Access rights to student educational records</li>
                <li>Disclosure limitations for educational records</li>
                <li>Directory information handling</li>
                <li>Student and parent rights regarding records</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.2 CyberSecured AI's FERPA Role</h3>
              <p className="text-gray-300 mb-4">CyberSecured AI serves educational institutions as a:</p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>School Official:</strong> Under the school official exception (34 CFR § 99.31(a)(1))</li>
                <li><strong>Institutional Service Provider:</strong> Providing cybersecurity services with legitimate educational interest</li>
                <li><strong>Technology Partner:</strong> Supporting institutional security and compliance requirements</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">2. Educational Records Protection</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Definition of Educational Records</h3>
              <p className="text-gray-300 mb-4">
                Under FERPA, educational records include any record maintained by an educational institution 
                that contains personally identifiable information about students, including:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-slate-800/50 border-gray-600 p-4">
                  <h4 className="text-white font-semibold mb-2">Academic Records</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Grades and transcripts</li>
                    <li>• Course enrollment data</li>
                    <li>• Academic progress records</li>
                    <li>• Disciplinary records</li>
                  </ul>
                </Card>
                <Card className="bg-slate-800/50 border-gray-600 p-4">
                  <h4 className="text-white font-semibold mb-2">System Records</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Login and access logs</li>
                    <li>• System usage data</li>
                    <li>• Security incident records</li>
                    <li>• Communication records</li>
                  </ul>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Personally Identifiable Information (PII)</h3>
              <p className="text-gray-300 mb-4">
                We protect all forms of student PII, including but not limited to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Direct Identifiers:</strong> Name, student ID, SSN, biometric records</li>
                <li><strong>Indirect Identifiers:</strong> Date/place of birth, mother's maiden name</li>
                <li><strong>Technical Identifiers:</strong> IP addresses, device IDs, user accounts</li>
                <li><strong>Contextual Information:</strong> Data that could identify students when combined</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">3. School Official Exception</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Legitimate Educational Interest</h3>
              <p className="text-gray-300 mb-4">
                CyberSecured AI operates under the school official exception with legitimate educational 
                interest in cybersecurity services:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Network Security:</strong> Protecting institutional IT infrastructure</li>
                <li><strong>Data Protection:</strong> Safeguarding student and institutional data</li>
                <li><strong>Compliance Monitoring:</strong> Ensuring regulatory compliance</li>
                <li><strong>Incident Response:</strong> Responding to security threats and breaches</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Service Agreement Requirements</h3>
              <Card className="bg-green-500/10 border-green-500/30 p-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-200 font-semibold mb-2">FERPA Compliance Commitments:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use educational records only for authorized institutional services</li>
                      <li>• Maintain confidentiality equivalent to school officials</li>
                      <li>• Implement appropriate security safeguards</li>
                      <li>• Not re-disclose information without authorization</li>
                      <li>• Destroy records when no longer needed for services</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">4. Data Handling and Security</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Technical Safeguards</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Encryption:</strong> AES-256 encryption for all educational data</li>
                <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
                <li><strong>Network Security:</strong> Secure transmission protocols and firewalls</li>
                <li><strong>Data Minimization:</strong> Collection limited to necessary cybersecurity functions</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Administrative Safeguards</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Staff Training:</strong> FERPA compliance training for all personnel</li>
                <li><strong>Access Management:</strong> Regular review and updating of user access</li>
                <li><strong>Audit Procedures:</strong> Regular compliance audits and assessments</li>
                <li><strong>Incident Response:</strong> Procedures for handling security incidents</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Physical Safeguards</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Secure Facilities:</strong> Physical security at data centers</li>
                <li><strong>Access Controls:</strong> Restricted access to systems and equipment</li>
                <li><strong>Environmental Controls:</strong> Protection against environmental threats</li>
                <li><strong>Media Disposal:</strong> Secure destruction of storage media</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">5. Student and Parent Rights</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Access Rights</h3>
              <p className="text-gray-300 mb-4">
                Students and eligible parents have the right to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Inspect and Review:</strong> Educational records maintained by the institution</li>
                <li><strong>Request Amendment:</strong> Correction of inaccurate or misleading records</li>
                <li><strong>Consent to Disclosure:</strong> Control disclosure of personally identifiable information</li>
                <li><strong>File Complaints:</strong> With the U.S. Department of Education regarding violations</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Notification Requirements</h3>
              <p className="text-gray-300 mb-4">
                Educational institutions must annually notify students and parents about:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>FERPA rights and procedures</li>
                <li>Directory information policies</li>
                <li>Right to file complaints</li>
                <li>Disclosure policies and exceptions</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">6. Data Retention and Disposal</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Retention Periods</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                <table className="w-full text-gray-300 text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2">Record Type</th>
                      <th className="text-left p-2">Retention Period</th>
                      <th className="text-left p-2">Disposal Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Security Logs</td>
                      <td className="p-2">3 years or as required</td>
                      <td className="p-2">Secure deletion</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Access Records</td>
                      <td className="p-2">Duration of service + 1 year</td>
                      <td className="p-2">Secure deletion</td>
                    </tr>
                    <tr>
                      <td className="p-2">Incident Reports</td>
                      <td className="p-2">7 years for compliance</td>
                      <td className="p-2">Secure deletion</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Secure Disposal Procedures</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Digital Records:</strong> Multi-pass overwriting and cryptographic erasure</li>
                <li><strong>Backup Systems:</strong> Secure deletion from all backup and archive systems</li>
                <li><strong>Physical Media:</strong> Degaussing and physical destruction when required</li>
                <li><strong>Documentation:</strong> Certificate of destruction for all disposed records</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">7. Breach Notification and Response</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">7.1 Incident Response Plan</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Immediate Response:</strong> Containment and assessment within 1 hour</li>
                <li><strong>Institution Notification:</strong> Notification within 24 hours of discovery</li>
                <li><strong>Student Notification:</strong> As required by institutional policy and law</li>
                <li><strong>Regulatory Reporting:</strong> Compliance with federal and state requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">7.2 Post-Incident Procedures</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Forensic Analysis:</strong> Detailed investigation of the incident</li>
                <li><strong>Remediation:</strong> Implementation of corrective measures</li>
                <li><strong>Documentation:</strong> Comprehensive incident documentation</li>
                <li><strong>Policy Updates:</strong> Review and update of security policies</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-blue-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                FERPA Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>FERPA Compliance Officer:</strong> ferpa@cybersecuredai.com</p>
                <p><strong>Educational Privacy Team:</strong> education@cybersecuredai.com</p>
                <p><strong>Security Incident Response:</strong> incident@cybersecuredai.com</p>
                <p><strong>General Legal:</strong> legal@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For FERPA-related questions or concerns, please contact our compliance team. 
                  Educational institutions can also reach out regarding service agreements and compliance verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}