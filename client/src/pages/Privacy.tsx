import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

export default function Privacy() {
  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 py-20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          <div className="container mx-auto max-w-4xl px-4 relative">
            <div className="text-center">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-6">
                Privacy & Data Protection
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Privacy Protection</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Your privacy is fundamental to our mission. Learn how we protect and respect your data 
                with industry-leading security standards.
              </p>
              <div className="flex items-center justify-center space-x-6 text-gray-400">
                <span>• SOC 2 Type II Certified</span>
                <span>• GDPR Compliant</span>
                <span>• Zero Trust Architecture</span>
              </div>
              <p className="text-sm text-gray-400">Last updated: December 1, 2024</p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="space-y-12">
              
              <Card className="bg-white/5 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Eye className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Information We Collect</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>We collect information you provide directly to us, such as:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Account registration information (name, email, organization)</li>
                    <li>Security configuration and system data</li>
                    <li>Support communications and feedback</li>
                    <li>Usage analytics and performance metrics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">How We Protect Your Data</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>We implement industry-leading security measures:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>End-to-end encryption for all data transmission</li>
                    <li>Zero-trust architecture with multi-factor authentication</li>
                    <li>Regular security audits and compliance assessments</li>
                    <li>Data segregation and access controls</li>
                    <li>SOC 2 Type II certified data centers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Data Usage & Sharing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>We use your information to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve our cybersecurity services</li>
                    <li>Detect and prevent security threats</li>
                    <li>Communicate about service updates and security alerts</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                  <p className="mt-4">We never sell your personal data to third parties.</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-cyan-400" />
                    </div>
                    <CardTitle className="text-2xl text-white">Your Rights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and review your personal data</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Delete your account and associated data</li>
                    <li>Port your data to another service</li>
                    <li>Opt out of non-essential communications</li>
                  </ul>
                  <p className="mt-4">Contact us at info@cybersecuredai.com to exercise your rights.</p>
                </CardContent>
              </Card>

              <Card className="bg-cyan-500/10 border-cyan-500/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Questions about this Privacy Policy?</h3>
                  <p className="text-gray-300 mb-4">
                    If you have any questions or concerns about our privacy practices, please contact our Data Protection Officer.
                  </p>
                  <p className="text-cyan-400">
                    Email: info@cybersecuredai.com<br />
                    Phone: (800) 608-1030<br />
                    Website: www.cybersecuredai.com
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