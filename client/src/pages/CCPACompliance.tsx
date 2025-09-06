import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, Users, CheckCircle } from "lucide-react";

export default function CCPACompliance() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-yellow-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-yellow-400 text-yellow-400">
                <MapPin className="h-4 w-4 mr-2" />
                CCPA Compliance
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                CCPA/CPRA Compliance Statement
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                California Consumer Privacy Act & California Privacy Rights Act
              </p>
              <p className="text-yellow-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* CCPA/CPRA Compliant Notice */}
          <Card className="mb-8 bg-green-500/10 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-200 font-semibold mb-2">✓ CCPA/CPRA Compliant:</p>
                  <p className="text-gray-300">
                    CyberSecured AI complies with the California Consumer Privacy Act (CCPA) and California Privacy 
                    Rights Act (CPRA) for all California residents. This statement outlines your privacy rights and 
                    how to exercise them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                In the past 12 months, we have collected the following categories of personal information 
                from California consumers:
              </p>

              <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                <table className="w-full text-gray-300 text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Examples</th>
                      <th className="text-left p-2">Collected</th>
                      <th className="text-left p-2">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Identifiers</td>
                      <td className="p-2">Name, email, IP address</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">Directly from you</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Commercial Info</td>
                      <td className="p-2">Purchase history, preferences</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">Transaction records</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Internet Activity</td>
                      <td className="p-2">Website usage, interactions</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">Automatic collection</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Professional Info</td>
                      <td className="p-2">Job title, organization</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">Directly from you</td>
                    </tr>
                    <tr>
                      <td className="p-2">Geolocation</td>
                      <td className="p-2">General location data</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">IP address inference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. Your California Privacy Rights</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-blue-500/10 border-blue-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-blue-200 font-semibold mb-2">Access Rights</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Right to know what personal information is collected</li>
                        <li>• Right to know if personal information is sold or shared</li>
                        <li>• Right to access personal information</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-purple-500/10 border-purple-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-purple-200 font-semibold mb-2">Control Rights</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Right to delete personal information</li>
                        <li>• Right to correct inaccurate personal information</li>
                        <li>• Right to opt-out of sale/sharing</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">2.1 Enhanced Rights Under CPRA</h3>
              <p className="text-gray-300 mb-4">
                The California Privacy Rights Act (CPRA) provides additional rights:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Right to Limit Sensitive Information:</strong> Restrict use of sensitive personal information</li>
                <li><strong>Right to Opt-Out of Profiling:</strong> Opt-out of automated decision-making</li>
                <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
                <li><strong>Right to Data Portability:</strong> Receive personal information in portable format</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. How We Use Personal Information</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Business Purposes</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Service Provision:</strong> Delivering cybersecurity services and customer support</li>
                <li><strong>Security Operations:</strong> Threat detection, incident response, and protection</li>
                <li><strong>Compliance:</strong> Meeting legal obligations and regulatory requirements</li>
                <li><strong>Communications:</strong> Service notifications, security alerts, and customer updates</li>
                <li><strong>Quality Assurance:</strong> Improving service quality and customer experience</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Commercial Purposes</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Marketing:</strong> Promoting relevant cybersecurity services (with consent)</li>
                <li><strong>Analytics:</strong> Understanding customer needs and service effectiveness</li>
                <li><strong>Business Development:</strong> Developing new features and services</li>
                <li><strong>Partnerships:</strong> Collaborating with technology partners for enhanced services</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Information Sharing and Sale</h2>
              
              <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-200 font-semibold mb-2">Important Notice:</p>
                    <p className="text-gray-300">
                      CyberSecured AI does not sell personal information to third parties for monetary consideration. 
                      We may share information for business purposes as outlined below.
                    </p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">4.1 Business Purpose Sharing</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Service Providers:</strong> Cloud infrastructure, payment processing, customer support</li>
                <li><strong>Security Partners:</strong> Threat intelligence providers and security researchers</li>
                <li><strong>Legal Compliance:</strong> Law enforcement, regulatory agencies (when required by law)</li>
                <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Third-Party Recipients</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Categories of Third Parties:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Cloud service providers (infrastructure and hosting)</li>
                  <li>• Payment processors (billing and subscription management)</li>
                  <li>• Analytics providers (service improvement and optimization)</li>
                  <li>• Customer support platforms (helpdesk and communication)</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. Exercising Your Rights</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 How to Submit Requests</h3>
              <p className="text-gray-300 mb-4">
                California residents can exercise their privacy rights through the following methods:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Email:</strong> ccpa@cybersecuredai.com</li>
                <li><strong>Online Form:</strong> Available in your account settings</li>
                <li><strong>Phone:</strong> 1-800-CYBER-AI (1-800-292-3724)</li>
                <li><strong>Mail:</strong> 395 Pitchfork Trail Suite 902, Willow Park, TX 76087</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Verification Process</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Account Holders:</strong> Login to your account for automatic verification</li>
                <li><strong>Identity Verification:</strong> Provide email address and account information</li>
                <li><strong>Additional Verification:</strong> May require additional information for security</li>
                <li><strong>Authorized Agents:</strong> Written authorization required for third-party requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.3 Response Timeline</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Acknowledgment:</strong> Within 10 business days of request receipt</li>
                <li><strong>Response:</strong> Within 45 days (extendable to 90 days for complex requests)</li>
                <li><strong>Information Delivery:</strong> Secure delivery via encrypted email or portal</li>
                <li><strong>No Charge:</strong> No fee for up to 2 requests per 12-month period</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. Sensitive Personal Information</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Categories We Collect</h3>
              <p className="text-gray-300 mb-4">
                We may collect the following categories of sensitive personal information:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Account Credentials:</strong> Usernames and authentication information</li>
                <li><strong>Precise Geolocation:</strong> For threat detection and compliance (with consent)</li>
                <li><strong>Biometric Data:</strong> For enhanced authentication (optional, with explicit consent)</li>
                <li><strong>Security Data:</strong> Information necessary for cybersecurity services</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Sensitive Information Rights</h3>
              <Card className="bg-blue-500/10 border-blue-500/30 p-4">
                <p className="text-gray-300 text-sm">
                  You have the right to limit our use of sensitive personal information to what is reasonably 
                  necessary to provide our cybersecurity services. Contact us at ccpa@cybersecuredai.com to 
                  exercise this right.
                </p>
              </Card>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. Non-Discrimination and Financial Incentives</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">7.1 Non-Discrimination Policy</h3>
              <p className="text-gray-300 mb-4">
                We will not discriminate against you for exercising your CCPA rights by:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Denying goods or services</li>
                <li>Charging different prices or rates</li>
                <li>Providing different quality of goods or services</li>
                <li>Suggesting you will receive different treatment</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">7.2 Permitted Differences</h3>
              <p className="text-gray-300 mb-4">
                We may offer different prices, rates, or quality if the difference is reasonably related to 
                the value of your personal information to our business.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">8. Updates to This Statement</h2>
              <p className="text-gray-300">
                We may update this CCPA compliance statement periodically. We will notify California residents 
                of material changes by email and by posting the updated statement on our website. The effective 
                date at the top indicates when the statement was last revised.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-yellow-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-yellow-400" />
                CCPA Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>CCPA Requests:</strong> ccpa@cybersecuredai.com</p>
                <p><strong>Privacy Officer:</strong> privacy@cybersecuredai.com</p>
                <p><strong>Phone:</strong> 1-800-CYBER-AI (1-800-292-3724)</p>
                <p><strong>Mail:</strong> 395 Pitchfork Trail Suite 902, Willow Park, TX 76087</p>
                <p className="text-sm text-gray-400 mt-4">
                  For all California Consumer Privacy Act requests and questions, please contact our privacy team. 
                  We typically respond to requests within 10 business days of receipt.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}