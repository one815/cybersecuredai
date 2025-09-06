import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Shield, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-cyan-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-cyan-400 text-cyan-400">
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                CyberSecured AI Enterprise Cybersecurity Platform
              </p>
              <p className="text-cyan-400 font-semibold">
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
                <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-200 font-semibold mb-2">Agreement:</p>
                  <p className="text-gray-300">
                    By accessing or using CyberSecured AI services, you agree to be bound by these Terms of Service. 
                    If you disagree with any part of these terms, you may not access or use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">1. Service Description</h2>
              <p className="text-gray-300 mb-4">
                CyberSecured AI provides enterprise cybersecurity services including:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Real-time threat monitoring and detection</li>
                <li>AI-powered behavioral analytics and anomaly detection</li>
                <li>Compliance management and reporting</li>
                <li>Incident response and forensic analysis</li>
                <li>Security awareness training and education</li>
                <li>Threat intelligence and vulnerability management</li>
              </ul>
              <p className="text-gray-300 mt-4">
                Our services are specifically designed for educational institutions and government organizations 
                with specialized compliance requirements.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">2. User Eligibility and Account Registration</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Eligibility</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>You must be at least 18 years old to create an account</li>
                <li>You must be authorized to represent your organization</li>
                <li>You must provide accurate and complete registration information</li>
                <li>You must comply with all applicable laws and regulations</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Account Responsibility</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>You are responsible for maintaining account security</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>You are liable for all activities under your account</li>
                <li>You must keep your contact information current</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">3. Acceptable Use Policy</h2>
              <p className="text-gray-300 mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. 
                You may not use our services:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>To violate any local, state, national, or international law</li>
                <li>To transmit or distribute malicious software or harmful content</li>
                <li>To interfere with or disrupt our services or servers</li>
                <li>To attempt unauthorized access to any systems or data</li>
                <li>To impersonate any person or entity</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">4. Data Protection and Privacy</h2>
              <p className="text-gray-300 mb-4">
                We are committed to protecting your data and privacy. Our data handling practices include:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Compliance with FERPA, FISMA, and other relevant regulations</li>
                <li>Industry-standard encryption for data in transit and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Limited data retention based on business and legal requirements</li>
                <li>Transparent data breach notification procedures</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">5. Service Availability and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Service Level Agreement</h3>
              <p className="text-gray-300 mb-4">
                We strive to maintain 99.9% uptime for our core services, excluding scheduled maintenance. 
                Detailed SLA terms are available in our Service Level Agreement document.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Limitations</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Services may be temporarily unavailable for maintenance</li>
                <li>Performance may vary based on network conditions</li>
                <li>Some features may require additional licensing</li>
                <li>Third-party integrations are subject to their own terms</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">6. Limitation of Liability</h2>
              <Card className="bg-red-500/10 border-red-500/30 p-6">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-200 font-semibold mb-2">Important Legal Notice:</p>
                    <p className="text-gray-300 mb-2">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, CYBERSECURED AI SHALL NOT BE LIABLE FOR ANY 
                      INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT 
                      LIMITED TO LOSS OF PROFITS, DATA, OR USE.
                    </p>
                    <p className="text-gray-300">
                      Our total liability shall not exceed the amount paid by you for the services in the 
                      twelve months preceding the claim.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">7. Termination</h2>
              <p className="text-gray-300 mb-4">
                Either party may terminate this agreement:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>With 30 days written notice for convenience</li>
                <li>Immediately for material breach of terms</li>
                <li>Immediately for non-payment of fees</li>
                <li>Upon expiration of the service period</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">8. Governing Law and Disputes</h2>
              <p className="text-gray-300 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of Texas, 
                without regard to its conflict of law principles.
              </p>
              <p className="text-gray-300">
                Any disputes arising from these Terms shall be resolved through binding arbitration in accordance 
                with the rules of the American Arbitration Association.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-300">
                We reserve the right to modify these Terms at any time. Changes will be posted on our website 
                and will become effective 30 days after posting. Your continued use of our services after any 
                changes constitutes acceptance of the new Terms.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-cyan-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Company:</strong> CyberSecure AI Ltd.</p>
                <p><strong>Email:</strong> legal@cybersecuredai.com</p>
                <p><strong>General Contact:</strong> one@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For urgent legal matters, please visit our Contact page to submit a support ticket. 
                  We typically respond to legal inquiries within 2-3 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}