import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Clock, Shield, CheckCircle2 } from "lucide-react";

export default function ServiceLevelAgreement() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-purple-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-purple-400 text-purple-400">
                <BarChart3 className="h-4 w-4 mr-2" />
                Service Level Agreement
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                Service Level Agreement
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                CyberSecured AI Enterprise Cybersecurity Platform
              </p>
              <p className="text-purple-400 font-semibold">
                Effective Date: September 6, 2025 | Version 3.0
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Service Commitments */}
          <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <BarChart3 className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 font-semibold mb-2">📊 Our Service Commitments:</p>
                  <p className="text-gray-300">
                    CyberSecured AI provides enterprise-grade cybersecurity services with guaranteed uptime, 
                    response times, and performance standards. This SLA outlines our service commitments, 
                    measurement methods, and remedies for service level breaches.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">1. Service Availability Guarantees</h2>
              
              <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-200 font-semibold mb-2">1.1 Uptime Commitment</h4>
                    <p className="text-gray-300 mb-2">
                      <strong>99.9% Monthly Uptime Guarantee</strong> for core cybersecurity services
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li><strong>Measurement Period:</strong> Monthly basis (calendar month)</li>
                      <li><strong>Maximum Downtime:</strong> 43.2 minutes per month</li>
                      <li><strong>Service Credit:</strong> 10% monthly fee credit for each full percentage point below 99.9%</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">1.2 Service Tier Availability</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-slate-800/50 border-gray-600 p-4">
                  <h4 className="text-white font-semibold mb-2">Essential Tier</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 99.5% uptime guarantee</li>
                    <li>• Business hours support</li>
                    <li>• Monthly maintenance windows</li>
                  </ul>
                </Card>
                <Card className="bg-slate-800/50 border-gray-600 p-4">
                  <h4 className="text-white font-semibold mb-2">Enterprise Tier</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 99.9% uptime guarantee</li>
                    <li>• 24/7 priority support</li>
                    <li>• Planned maintenance notifications</li>
                  </ul>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">1.3 Excluded Downtime</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Scheduled maintenance (with 72-hour advance notice)</li>
                <li>Emergency maintenance for security patches</li>
                <li>Third-party service provider outages</li>
                <li>Customer-initiated downtime or misconfigurations</li>
                <li>Force majeure events (natural disasters, etc.)</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">2. Response Time Commitments</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Incident Response Times</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card className="bg-red-500/10 border-red-500/30 p-4">
                  <h4 className="text-red-200 font-semibold mb-2">Critical Incidents</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Initial Response: {"<"} 15 minutes</li>
                    <li>• Status Updates: Every 30 minutes</li>
                    <li>• Resolution Target: {"<"} 4 hours</li>
                  </ul>
                </Card>
                <Card className="bg-orange-500/10 border-orange-500/30 p-4">
                  <h4 className="text-orange-200 font-semibold mb-2">High Priority</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Initial Response: {"<"} 1 hour</li>
                    <li>• Status Updates: Every 4 hours</li>
                    <li>• Resolution Target: {"<"} 24 hours</li>
                  </ul>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Support Response Times</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>24/7 Emergency Support:</strong> 15 minutes for critical security incidents</li>
                <li><strong>Priority Support:</strong> 2 hours during business hours</li>
                <li><strong>Standard Support:</strong> 8 hours during business hours</li>
                <li><strong>General Inquiries:</strong> 24 hours during business hours</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">3. Performance Standards</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Platform Performance</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Dashboard Load Time:</strong> {"<"} 3 seconds for initial load</li>
                <li><strong>Report Generation:</strong> {"<"} 30 seconds for standard reports</li>
                <li><strong>API Response Time:</strong> {"<"} 500ms for 95% of requests</li>
                <li><strong>Data Processing:</strong> Real-time threat detection within 5 seconds</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Security Standards</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Threat Detection:</strong> 99.8% accuracy for known threats</li>
                <li><strong>False Positive Rate:</strong> {"<"} 2% for threat alerts</li>
                <li><strong>Vulnerability Scanning:</strong> Complete scan within 24 hours</li>
                <li><strong>Incident Analysis:</strong> Initial assessment within 1 hour</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.3 Compliance Standards</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Report Accuracy:</strong> 99.9% accuracy for compliance reports</li>
                <li><strong>Audit Trail:</strong> Complete logs maintained for 7 years</li>
                <li><strong>Data Backup:</strong> Daily backups with 99.9% success rate</li>
                <li><strong>Recovery Time:</strong> {"<"} 4 hours for full service restoration</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">4. Service Credits and Remedies</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Uptime Service Credits</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                <table className="w-full text-gray-300 text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2">Monthly Uptime</th>
                      <th className="text-left p-2">Service Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">99.0% - 99.8%</td>
                      <td className="p-2">10% of monthly fee</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">95.0% - 98.9%</td>
                      <td className="p-2">25% of monthly fee</td>
                    </tr>
                    <tr>
                      <td className="p-2">{"<"} 95.0%</td>
                      <td className="p-2">50% of monthly fee</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Response Time Credits</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Critical Incident Delays:</strong> 5% credit per hour beyond SLA</li>
                <li><strong>Support Response Delays:</strong> 2% credit per 4-hour period beyond SLA</li>
                <li><strong>Maximum Monthly Credit:</strong> 100% of monthly service fee</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Credit Request Process</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Submit credit request within 30 days of SLA breach</li>
                <li>Provide detailed incident information and impact assessment</li>
                <li>Credits processed within 30 days of approved request</li>
                <li>Credits applied to next monthly invoice or refunded</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">5. Monitoring and Reporting</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Service Monitoring</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>24/7 Monitoring:</strong> Continuous monitoring of all service components</li>
                <li><strong>Real-time Alerts:</strong> Automated alerts for service degradation</li>
                <li><strong>Performance Metrics:</strong> Detailed metrics collection and analysis</li>
                <li><strong>Third-party Monitoring:</strong> Independent monitoring services for verification</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Reporting and Transparency</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Monthly SLA Reports:</strong> Detailed performance reports provided monthly</li>
                <li><strong>Real-time Status Page:</strong> Public status page with current service status</li>
                <li><strong>Incident Reports:</strong> Post-incident reports for major outages</li>
                <li><strong>Annual Review:</strong> Comprehensive annual SLA performance review</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">6. Limitations and Exclusions</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 SLA Exclusions</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Customer-caused outages or configuration errors</li>
                <li>Third-party service provider failures beyond our control</li>
                <li>Scheduled maintenance performed with proper notice</li>
                <li>Force majeure events and acts of nature</li>
                <li>Internet connectivity issues outside our network</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Maximum Liability</h3>
              <Card className="bg-yellow-500/10 border-yellow-500/30 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-200 font-semibold mb-2">Important Note:</p>
                    <p className="text-gray-300 text-sm">
                      Service credits are the exclusive remedy for SLA breaches. Total liability for SLA 
                      breaches shall not exceed 100% of monthly service fees paid in the affected month.
                    </p>
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-purple-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                SLA Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Service Level Management:</strong> sla@cybersecuredai.com</p>
                <p><strong>Credit Requests:</strong> credits@cybersecuredai.com</p>
                <p><strong>Technical Support:</strong> support@cybersecuredai.com</p>
                <p><strong>Emergency Response:</strong> emergency@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For SLA-related questions or to request service credits, please contact our service level 
                  management team. Emergency incidents should be reported immediately via phone or email.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}