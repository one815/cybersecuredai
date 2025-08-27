import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react";

export default function Terms() {
  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 py-20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          <div className="container mx-auto max-w-4xl px-4 relative">
            <div className="text-center">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-6">
                Legal Terms & Conditions
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Service</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Please read these terms carefully before using our cybersecurity platform and services.
              </p>
              <p className="text-sm text-gray-400">Last updated: December 1, 2024</p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="space-y-12">
              
              <Card className="bg-white/5 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Service Agreement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>By accessing and using CyberSecure AI services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use our platform in compliance with applicable laws and regulations</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Provide accurate and complete information</li>
                    <li>Report security incidents promptly</li>
                    <li>Use the service only for its intended cybersecurity purposes</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Scale className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Intellectual Property</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>CyberSecure AI retains all rights to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Proprietary AI algorithms and threat detection models</li>
                    <li>Platform software, interfaces, and documentation</li>
                    <li>Security intelligence and threat databases</li>
                    <li>Trademarks, logos, and brand assets</li>
                  </ul>
                  <p className="mt-4">You retain ownership of your organizational data and configurations.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Service Availability</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>We strive to provide:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>99.9% uptime for critical security services</li>
                    <li>24/7 threat monitoring and incident response</li>
                    <li>Regular platform updates and security patches</li>
                    <li>Scheduled maintenance with advance notice</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-yellow-500/10 border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Limitation of Liability</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>
                    CyberSecure AI provides cybersecurity services on an "as is" basis. While we implement 
                    industry-leading security measures, no security system is 100% foolproof. We are not 
                    liable for security breaches resulting from factors outside our reasonable control.
                  </p>
                  <p>
                    For government and education customers, additional terms may apply based on 
                    contract negotiations and regulatory requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cyan-500/10 border-cyan-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Questions about these Terms?</h3>
                  <p className="text-gray-300 mb-4">
                    If you have questions about these terms of service, please contact our legal team.
                  </p>
                  <p className="text-cyan-400">
                    Email: legal@cybersecure.ai<br />
                    Phone: 1-800-CYBER-AI<br />
                    Mail: CyberSecure AI Legal Dept, 123 Security Blvd, Austin, TX 78701
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}