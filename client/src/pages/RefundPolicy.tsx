import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function RefundPolicy() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-green-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-green-400 text-green-400">
                <DollarSign className="h-4 w-4 mr-2" />
                Refund Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                Refund & Cancellation Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                CyberSecured AI Subscription and Service Terms
              </p>
              <p className="text-green-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Fair Refund Policy Notice */}
          <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <DollarSign className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 font-semibold mb-2">💰 Fair Refund Policy:</p>
                  <p className="text-gray-300">
                    CyberSecured AI provides clear refund and cancellation terms for all our cybersecurity services. 
                    We offer different policies for different service types and customer segments to ensure fair 
                    treatment for all users.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">1. General Refund Principles</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">1.1 Our Commitment</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Customer Satisfaction:</strong> We stand behind our services and want customers to be satisfied</li>
                <li><strong>Fair Treatment:</strong> All refund requests are evaluated fairly and consistently</li>
                <li><strong>Clear Terms:</strong> Transparent refund conditions and timelines</li>
                <li><strong>Prompt Processing:</strong> Quick processing of valid refund requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.2 Refund Eligibility</h3>
              <p className="text-gray-300 mb-4">Refunds are available under the following conditions:</p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Service Issues:</strong> Significant service outages or performance problems</li>
                <li><strong>Billing Errors:</strong> Incorrect charges or unauthorized billing</li>
                <li><strong>Early Termination:</strong> Cancellation within specified timeframes</li>
                <li><strong>Special Circumstances:</strong> Evaluated on a case-by-case basis</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">2. Refund Policies by Service Type</h2>
              
              <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-200 font-semibold mb-2">Monthly Subscriptions</h4>
                    <p className="text-gray-300 mb-2">
                      Monthly plans offer maximum flexibility with easy cancellation.
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Cancel anytime before next billing cycle</li>
                      <li>• No refund for current month's usage</li>
                      <li>• Service continues until period end</li>
                      <li>• Prorated refunds for service outages {">"} 24 hours</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="bg-blue-500/10 border-blue-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-200 font-semibold mb-2">Annual Subscriptions</h4>
                    <p className="text-gray-300 mb-2">
                      Annual plans offer significant savings with fair cancellation terms.
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• 30-day full refund window from purchase date</li>
                      <li>• Prorated refunds for cancellation after 30 days</li>
                      <li>• Full refund for service outages {">"} 72 hours</li>
                      <li>• Educational discounts non-refundable after 60 days</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="bg-purple-500/10 border-purple-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-purple-200 font-semibold mb-2">Enterprise Contracts</h4>
                    <p className="text-gray-300 mb-2">
                      Custom enterprise agreements have specific refund terms.
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Terms negotiated in individual contracts</li>
                      <li>• Typically 60-90 day initial refund period</li>
                      <li>• Service level agreement (SLA) guarantees</li>
                      <li>• Dedicated customer success management</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">3. Service-Specific Refund Terms</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Platform Subscriptions</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Security Monitoring:</strong> Monthly cancellation with 24-hour notice</li>
                <li><strong>Threat Intelligence:</strong> Minimum 30-day commitment, then monthly cancellation</li>
                <li><strong>Compliance Management:</strong> Quarterly commitment due to setup costs</li>
                <li><strong>Training Modules:</strong> 7-day refund window for individual courses</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Professional Services</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Security Assessments:</strong> 50% refund if cancelled before work begins</li>
                <li><strong>Implementation Services:</strong> Refunds based on percentage of work completed</li>
                <li><strong>Training Services:</strong> Full refund if cancelled 48 hours before delivery</li>
                <li><strong>Consulting Hours:</strong> No refund once time blocks are consumed</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.3 Add-on Services</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Additional Storage:</strong> Prorated refunds based on usage</li>
                <li><strong>Premium Support:</strong> Monthly cancellation with immediate effect</li>
                <li><strong>API Access:</strong> Usage-based billing, no refunds for consumed credits</li>
                <li><strong>Integrations:</strong> Setup fees non-refundable after configuration</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">4. Refund Process and Timeline</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 How to Request a Refund</h3>
              <ol className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Submit Request:</strong> Contact billing@cybersecuredai.com with details</li>
                <li><strong>Provide Information:</strong> Include account details and reason for refund</li>
                <li><strong>Review Process:</strong> Our team will review within 2-3 business days</li>
                <li><strong>Decision Notification:</strong> Email notification of approval or denial</li>
                <li><strong>Processing:</strong> Approved refunds processed within 5-7 business days</li>
              </ol>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Required Information</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Account email address and organization name</li>
                <li>Invoice number or billing reference</li>
                <li>Detailed reason for refund request</li>
                <li>Date of service initiation or purchase</li>
                <li>Documentation for service issues (if applicable)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Processing Times</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Credit Card Refunds:</strong> 3-5 business days</li>
                <li><strong>Bank Transfer Refunds:</strong> 5-7 business days</li>
                <li><strong>International Transfers:</strong> 7-10 business days</li>
                <li><strong>Complex Cases:</strong> Up to 15 business days</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">5. Non-Refundable Items</h2>
              
              <Card className="bg-red-500/10 border-red-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-200 font-semibold mb-2">Non-Refundable Services:</p>
                    <p className="text-gray-300">
                      Certain services and fees are non-refundable due to their nature or costs involved in delivery.
                    </p>
                  </div>
                </div>
              </Card>

              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Setup and Onboarding Fees:</strong> One-time costs for account configuration</li>
                <li><strong>Data Migration Services:</strong> After migration has been completed</li>
                <li><strong>Custom Development:</strong> Bespoke development work once delivered</li>
                <li><strong>Third-Party Licenses:</strong> Software licenses purchased on customer behalf</li>
                <li><strong>Breach Incident Response:</strong> Emergency response services after delivery</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">6. Dispute Resolution</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Appeal Process</h3>
              <p className="text-gray-300 mb-4">
                If your refund request is denied, you may appeal the decision:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Submit appeal to appeals@cybersecuredai.com within 30 days</li>
                <li>Provide additional documentation or justification</li>
                <li>Senior management review within 5 business days</li>
                <li>Final decision communicated via email</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Alternative Resolutions</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Service Credits:</strong> Account credits for future services</li>
                <li><strong>Extended Trial:</strong> Additional trial period for evaluation</li>
                <li><strong>Service Upgrade:</strong> Migration to more suitable service tier</li>
                <li><strong>Payment Plan:</strong> Alternative payment arrangements</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-green-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Billing and Refund Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Billing Support:</strong> billing@cybersecuredai.com</p>
                <p><strong>Refund Requests:</strong> refunds@cybersecuredai.com</p>
                <p><strong>Appeals:</strong> appeals@cybersecuredai.com</p>
                <p><strong>Customer Success:</strong> success@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For billing questions or refund requests, please contact our billing team. 
                  Most inquiries are resolved within 2-3 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}