import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Smartphone, AlertCircle, CheckCircle } from "lucide-react";

export default function SMSMessagingPolicy() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-green-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-green-400 text-green-400">
                <MessageSquare className="h-4 w-4 mr-2" />
                SMS Messaging Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                SMS Messaging Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                SMS Messaging and Multi-Factor Authentication Policy
              </p>
              <p className="text-green-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Key Services Notice */}
          <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Smartphone className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 font-semibold mb-2">Key Services:</p>
                  <p className="text-gray-300">
                    This SMS Messaging Policy governs the use of text messaging services provided by CyberSecured AI platform, 
                    including security alerts, multi-factor authentication (MFA), and system notifications sent via SMS to our 
                    users' mobile devices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">1. Overview and Purpose</h2>
              <p className="text-gray-300 mb-4">
                This SMS Messaging Policy governs the use of text messaging services provided by CyberSecured AI platform, 
                including security alerts, multi-factor authentication (MFA), and system notifications sent via SMS to our 
                users' mobile devices.
              </p>
              
              <Card className="bg-yellow-500/10 border-yellow-500/30 p-4">
                <p className="text-yellow-200 font-semibold mb-2">Key Services:</p>
                <p className="text-gray-300 text-sm">
                  Security alerts, MFA codes, incident notifications, system status updates, and compliance reminders.
                </p>
              </Card>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">2. Consent and Opt-In Requirements</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Express Consent</h3>
              <p className="text-gray-300 mb-4">
                By providing your mobile phone number and agreeing to receive SMS messages, you provide express written 
                consent to receive text messages from CyberSecured AI. This consent is required for:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Multi-factor authentication codes</li>
                <li>Security incident alerts and warnings</li>
                <li>System maintenance notifications</li>
                <li>Compliance deadline reminders</li>
                <li>Platform status updates</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Double Opt-In Process</h3>
              <p className="text-gray-300 mb-4">
                Upon initial registration, users will receive a confirmation SMS to verify their phone number. 
                Users must respond with the requested confirmation code to activate SMS services.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">2.3 Consent Documentation</h3>
              <p className="text-gray-300 mb-4">We maintain records of your consent including:</p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Date and time of consent</li>
                <li>IP address and device information</li>
                <li>Phone number verification status</li>
                <li>Specific services opted into</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">3. Types of SMS Messages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-red-500/10 border-red-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-200 font-semibold mb-2">Critical Security Messages</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Multi-factor authentication codes</li>
                        <li>• Security breach notifications</li>
                        <li>• Unauthorized access alerts</li>
                        <li>• System security warnings</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-blue-500/10 border-blue-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-blue-200 font-semibold mb-2">System Notifications</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Scheduled maintenance alerts</li>
                        <li>• Service status updates</li>
                        <li>• Compliance deadline reminders</li>
                        <li>• Account status notifications</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">3.1 Message Frequency</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>MFA Codes:</strong> As needed for authentication (typically 1-10 per day)</li>
                <li><strong>Security Alerts:</strong> Immediate for critical incidents (varies by threat level)</li>
                <li><strong>System Updates:</strong> Maximum 2-3 per week for non-urgent notifications</li>
                <li><strong>Maintenance Notices:</strong> 24-48 hours advance notice</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Message Content</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Messages are concise and contain only essential information</li>
                <li>Security-sensitive information is never included in SMS content</li>
                <li>All messages clearly identify CyberSecured AI as the sender</li>
                <li>Time-sensitive codes expire within 10 minutes for security</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">4. Opt-Out and Management</h2>
              
              <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-200 font-semibold mb-2">Easy Opt-Out Options:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Reply "STOP" to any message to unsubscribe</li>
                      <li>• Update preferences in your account settings</li>
                      <li>• Contact support at support@cybersecuredai.com</li>
                      <li>• Use the unsubscribe link in account notifications</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">4.1 Selective Opt-Out</h3>
              <p className="text-gray-300 mb-4">You can choose to opt out of specific message types:</p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Non-Critical Alerts:</strong> Marketing and promotional messages</li>
                <li><strong>System Updates:</strong> Non-urgent maintenance notifications</li>
                <li><strong>Compliance Reminders:</strong> Non-mandatory deadline reminders</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Required Messages</h3>
              <Card className="bg-yellow-500/10 border-yellow-500/30 p-4">
                <p className="text-yellow-200 font-semibold mb-2">Important Note:</p>
                <p className="text-gray-300 text-sm">
                  Critical security messages, including MFA codes and security breach notifications, 
                  cannot be disabled as they are essential for account security and regulatory compliance.
                </p>
              </Card>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">5. Carrier and Rate Information</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Carrier Compatibility</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Compatible with all major U.S. carriers (Verizon, AT&T, T-Mobile, Sprint)</li>
                <li>Support for most international carriers (coverage may vary)</li>
                <li>Automatic carrier detection and optimization</li>
                <li>Fallback delivery methods for delivery failures</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Message and Data Rates</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Charges:</strong> Standard messaging and data rates may apply</li>
                <li><strong>Responsibility:</strong> You are responsible for any carrier charges</li>
                <li><strong>International:</strong> International messaging rates may apply for global users</li>
                <li><strong>Unlimited Plans:</strong> Most unlimited SMS plans cover our messages</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.3 Delivery and Reliability</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Messages typically delivered within 30 seconds</li>
                <li>Delivery confirmation and retry mechanisms</li>
                <li>Alternative delivery methods for critical messages</li>
                <li>24/7 monitoring of delivery success rates</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">6. Privacy and Security</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Phone Number Protection</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Secure Storage:</strong> Phone numbers encrypted at rest and in transit</li>
                <li><strong>Limited Access:</strong> Access restricted to authorized personnel only</li>
                <li><strong>No Sharing:</strong> Phone numbers never shared with third parties for marketing</li>
                <li><strong>Compliance:</strong> Full compliance with TCPA, CAN-SPAM, GDPR, and CCPA</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Message Security</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Encryption:</strong> All messages encrypted during transmission</li>
                <li><strong>Secure Codes:</strong> MFA codes are cryptographically secure</li>
                <li><strong>Expiration:</strong> Time-sensitive codes expire automatically</li>
                <li><strong>Audit Logs:</strong> Comprehensive logging for security and compliance</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.3 Data Retention</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Message Content:</strong> Not stored after successful delivery</li>
                <li><strong>Phone Numbers:</strong> Retained while account is active</li>
                <li><strong>Delivery Logs:</strong> Kept for 90 days for troubleshooting</li>
                <li><strong>Consent Records:</strong> Maintained for regulatory compliance</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">7. Regulatory Compliance</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">7.1 TCPA Compliance</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Express written consent obtained before sending messages</li>
                <li>Clear opt-out mechanisms provided in every message</li>
                <li>Immediate processing of opt-out requests</li>
                <li>Maintenance of consent and opt-out records</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">7.2 International Compliance</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>GDPR:</strong> Full compliance for European users</li>
                <li><strong>CCPA:</strong> California privacy rights respected</li>
                <li><strong>PIPEDA:</strong> Canadian privacy law compliance</li>
                <li><strong>Local Laws:</strong> Adherence to applicable local regulations</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">7.3 Industry Standards</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>CTIA (Cellular Telecommunications Industry Association) best practices</li>
                <li>Mobile Marketing Association (MMA) guidelines</li>
                <li>Industry self-regulatory standards for SMS marketing</li>
                <li>Regular compliance audits and assessments</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">8. Help and Support</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">8.1 Getting Help</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Reply HELP:</strong> Text "HELP" to any message for assistance</li>
                <li><strong>Email Support:</strong> sms-support@cybersecuredai.com</li>
                <li><strong>Account Settings:</strong> Manage preferences in your account</li>
                <li><strong>Knowledge Base:</strong> Online help articles and FAQs</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">8.2 Common Issues</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Not Receiving Messages:</strong> Check phone number accuracy and carrier compatibility</li>
                <li><strong>Delayed Messages:</strong> Carrier network issues may cause delays</li>
                <li><strong>Duplicate Messages:</strong> Rare network issues may cause duplicates</li>
                <li><strong>International Issues:</strong> Some carriers may block international SMS</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-green-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-400" />
                SMS Support Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>SMS Support:</strong> sms-support@cybersecuredai.com</p>
                <p><strong>Technical Support:</strong> support@cybersecuredai.com</p>
                <p><strong>Privacy Questions:</strong> privacy@cybersecuredai.com</p>
                <p><strong>Compliance:</strong> compliance@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For SMS-related questions or issues, please contact our SMS support team. 
                  For immediate help, reply "HELP" to any of our messages.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}