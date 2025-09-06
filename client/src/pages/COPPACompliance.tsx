import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Baby, Shield, Users, CheckCircle } from "lucide-react";

export default function COPPACompliance() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-pink-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-pink-400 text-pink-400">
                <Baby className="h-4 w-4 mr-2" />
                COPPA Compliance
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent">
                COPPA Compliance Statement
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Children's Online Privacy Protection Act (15 U.S.C. §§ 6501-6505)
              </p>
              <p className="text-pink-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* COPPA Compliance Notice */}
          <Card className="mb-8 bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Baby className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-200 font-semibold mb-2">👶 COPPA Compliance:</p>
                  <p className="text-gray-300">
                    CyberSecured AI is committed to protecting children's privacy in accordance with the Children's 
                    Online Privacy Protection Act (COPPA). We implement special safeguards for educational technology 
                    environments where children under 13 may use school-provided services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">1. COPPA Overview and Application</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">1.1 What is COPPA</h3>
              <p className="text-gray-300 mb-4">
                The Children's Online Privacy Protection Act (COPPA) is a federal law that protects the privacy 
                of children under 13 years of age online. COPPA requires parental consent before collecting 
                personal information from children and establishes specific requirements for:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Notice and disclosure of information practices</li>
                <li>Parental consent for data collection and use</li>
                <li>Access rights for parents to review child information</li>
                <li>Safe harbor provisions for school-authorized services</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.2 CyberSecured AI and COPPA</h3>
              <p className="text-gray-300 mb-4">
                CyberSecured AI serves educational institutions and may encounter student data through our 
                cybersecurity services. Our COPPA compliance approach includes:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>School Authorization:</strong> Operating under COPPA's school consent exception</li>
                <li><strong>Limited Collection:</strong> Minimal collection of student information for cybersecurity purposes</li>
                <li><strong>No Marketing:</strong> No collection or use of student information for advertising or marketing</li>
                <li><strong>Enhanced Protection:</strong> Additional safeguards beyond COPPA requirements</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">2. School Consent Exception</h2>
              
              <Card className="bg-blue-500/10 border-blue-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-200 font-semibold mb-2">School Authorization Framework</h4>
                    <p className="text-gray-300 text-sm">
                      CyberSecured AI operates under COPPA's school consent exception when providing 
                      cybersecurity services to educational institutions for the benefit and use of the school.
                    </p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">2.1 Educational Purpose Requirements</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Legitimate Educational Interest:</strong> Services provide educational or institutional benefit</li>
                <li><strong>School Direction:</strong> Collection and use directed by or on behalf of the school</li>
                <li><strong>Educational Context:</strong> Use limited to educational or cybersecurity purposes</li>
                <li><strong>No Commercial Use:</strong> No use for commercial advertising or marketing to children</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Institutional Agreements</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Service Agreements:</strong> Written agreements with educational institutions</li>
                <li><strong>COPPA Compliance Terms:</strong> Specific COPPA protection clauses</li>
                <li><strong>Data Use Restrictions:</strong> Limits on collection, use, and disclosure</li>
                <li><strong>Deletion Requirements:</strong> Data deletion when no longer needed for services</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">3. Children's Information Protection</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Information Collection Principles</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Minimal Collection:</strong> Collect only information necessary for cybersecurity services</li>
                <li><strong>Purpose Limitation:</strong> Use information only for authorized educational purposes</li>
                <li><strong>School Authorization:</strong> Collection authorized by the educational institution</li>
                <li><strong>No Direct Marketing:</strong> Never use children's information for marketing or advertising</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Types of Information</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                <table className="w-full text-gray-300 text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2">Information Type</th>
                      <th className="text-left p-2">Collection Purpose</th>
                      <th className="text-left p-2">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Technical Logs</td>
                      <td className="p-2">Security monitoring</td>
                      <td className="p-2">30 days maximum</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Access Records</td>
                      <td className="p-2">Audit compliance</td>
                      <td className="p-2">1 year or as required</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Security Events</td>
                      <td className="p-2">Incident response</td>
                      <td className="p-2">Duration of investigation</td>
                    </tr>
                    <tr>
                      <td className="p-2">User Identifiers</td>
                      <td className="p-2">Authentication</td>
                      <td className="p-2">Duration of enrollment</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">3.3 Enhanced Protections</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Encryption:</strong> All children's information encrypted at rest and in transit</li>
                <li><strong>Access Controls:</strong> Strict role-based access controls</li>
                <li><strong>Audit Logging:</strong> Comprehensive audit trails for all access</li>
                <li><strong>Data Minimization:</strong> Automated data minimization and deletion</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">4. Parental Rights and Notifications</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Notice Requirements</h3>
              <p className="text-gray-300 mb-4">
                While we operate under the school consent exception, we support schools in providing appropriate 
                notice to parents about:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Types of information that may be collected through cybersecurity services</li>
                <li>How the information is used to protect school systems and data</li>
                <li>Information sharing practices and security measures</li>
                <li>Parents' rights regarding their child's information</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Parental Access Rights</h3>
              <p className="text-gray-300 mb-4">
                Parents have the right to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Review:</strong> Request information about data collection practices</li>
                <li><strong>Access:</strong> Review their child's personal information (through the school)</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion when no longer needed for educational purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Request Process</h3>
              <Card className="bg-green-500/10 border-green-500/30 p-4">
                <p className="text-gray-300 text-sm">
                  Parents should contact their child's school directly for requests regarding their child's information. 
                  Schools may then coordinate with CyberSecured AI as appropriate to fulfill these requests.
                </p>
              </Card>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">5. Data Security and Retention</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Security Measures</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Encryption:</strong> AES-256 encryption for all data at rest and in transit</li>
                <li><strong>Access Controls:</strong> Multi-factor authentication and role-based access</li>
                <li><strong>Network Security:</strong> Secure network architecture with monitoring</li>
                <li><strong>Personnel Training:</strong> Regular COPPA compliance training for staff</li>
                <li><strong>Incident Response:</strong> Comprehensive incident response procedures</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Data Retention and Deletion</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Limited Retention:</strong> Data held only as long as necessary for services</li>
                <li><strong>Automatic Deletion:</strong> Automated deletion processes for expired data</li>
                <li><strong>School Requests:</strong> Prompt response to school deletion requests</li>
                <li><strong>Service Termination:</strong> Complete data deletion upon service termination</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.3 Third-Party Restrictions</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>No Sharing:</strong> Children's information not shared with third parties for marketing</li>
                <li><strong>Service Providers:</strong> Strict agreements with any service providers</li>
                <li><strong>Legal Compliance:</strong> Disclosure only as required by law</li>
                <li><strong>Security Partners:</strong> Limited sharing for security purposes only with school consent</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">6. Incident Response and Breach Notification</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Incident Response Plan</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Immediate Response:</strong> Immediate containment and assessment</li>
                <li><strong>School Notification:</strong> Prompt notification to affected schools</li>
                <li><strong>Impact Assessment:</strong> Evaluation of any impact on children's information</li>
                <li><strong>Remediation:</strong> Swift remediation and additional safeguards</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Notification Requirements</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Schools:</strong> Immediate notification to affected educational institutions</li>
                <li><strong>Parents:</strong> Schools coordinate appropriate parent notification</li>
                <li><strong>Authorities:</strong> Report to appropriate authorities as required</li>
                <li><strong>Transparency:</strong> Clear communication about incident and response</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">7. Compliance Monitoring and Training</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">7.1 Internal Compliance Program</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Regular Audits:</strong> Periodic internal compliance audits</li>
                <li><strong>Staff Training:</strong> Comprehensive COPPA training for all personnel</li>
                <li><strong>Policy Updates:</strong> Regular review and update of policies</li>
                <li><strong>Compliance Officer:</strong> Designated COPPA compliance officer</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">7.2 External Validation</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Third-Party Audits:</strong> Independent compliance assessments</li>
                <li><strong>Legal Review:</strong> Regular legal review of practices</li>
                <li><strong>Industry Standards:</strong> Adherence to educational technology best practices</li>
                <li><strong>Continuous Improvement:</strong> Ongoing improvement of protection measures</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-pink-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-400" />
                COPPA Compliance Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>COPPA Compliance Officer:</strong> coppa@cybersecuredai.com</p>
                <p><strong>Education Privacy Team:</strong> education@cybersecuredai.com</p>
                <p><strong>Legal Team:</strong> legal@cybersecuredai.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For all COPPA-related questions or concerns, please contact our compliance team. 
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