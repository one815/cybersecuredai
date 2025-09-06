import { Shield, FileText, Users, Scale, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function LegalNew() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-black/20 border-b border-cyan-500/30">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 border-cyan-400 text-cyan-400">
              <Scale className="h-4 w-4 mr-2" />
              Legal Information
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Legal
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Important legal information, terms of service, privacy policies, and compliance documentation for CyberSecured AI services.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Terms of Service */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 group-hover:shadow-lg group-hover:shadow-cyan-400/20 transition-all duration-300">
                  <FileText className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
                Terms of Service
              </CardTitle>
              <CardDescription>
                Comprehensive terms governing the use of CyberSecured AI platform and services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Our Terms of Service outline the rights, responsibilities, and obligations when using our cybersecurity platform.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <p>• Platform usage guidelines</p>
                <p>• Service level agreements</p>
                <p>• User responsibilities</p>
                <p>• Limitation of liability</p>
              </div>
              <Link href="/legal/terms-of-service">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Full Terms of Service
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-green-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 group"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 group-hover:shadow-lg group-hover:shadow-green-400/20 transition-all duration-300">
                  <Shield className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                </div>
                Privacy Policy
              </CardTitle>
              <CardDescription>
                How we collect, use, and protect your personal and organizational data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                We are committed to protecting your privacy and maintaining the highest standards of data security.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <p>• Data collection practices</p>
                <p>• Information usage policies</p>
                <p>• Third-party integrations</p>
                <p>• User control options</p>
              </div>
              <Link href="/legal/privacy-policy">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-green-400 text-green-400 hover:bg-green-400/10"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  View Full Privacy Policy
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Compliance & Regulations */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-orange-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 group"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-400/20 to-amber-500/20 backdrop-blur-sm border border-orange-400/30 group-hover:shadow-lg group-hover:shadow-orange-400/20 transition-all duration-300">
                  <Users className="h-5 w-5 text-orange-400 group-hover:text-orange-300 transition-colors" />
                </div>
                Compliance
              </CardTitle>
              <CardDescription>
                Regulatory compliance and industry standards we adhere to.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                CyberSecured AI complies with major regulatory frameworks and industry standards.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <p>• FERPA compliance</p>
                <p>• FISMA requirements</p>
                <p>• CIPA standards</p>
                <p>• SOC 2 certification</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/legal/ferpa-compliance">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-orange-400 text-orange-400 hover:bg-orange-400/10"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    FERPA
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-orange-400 text-orange-400 hover:bg-orange-400/10"
                  onClick={() => window.open('/legal/FedRAMP_Compliance.html', '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  FedRAMP
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Terms of Use */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400/20 to-indigo-500/20 backdrop-blur-sm border border-purple-400/30 group-hover:shadow-lg group-hover:shadow-purple-400/20 transition-all duration-300">
                  <FileText className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
                Terms of Use
              </CardTitle>
              <CardDescription>
                End-user license agreement and usage terms for CyberSecured AI platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-4">
                Our Terms of Use define the legal relationship between users and our cybersecurity platform.
              </p>
              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <p>• Software licensing terms</p>
                <p>• End-user agreements</p>
                <p>• Intellectual property rights</p>
                <p>• Usage restrictions</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-purple-400 text-purple-400 hover:bg-purple-400/10"
                onClick={() => window.open('/legal/Terms_of_Use.html', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Terms of Use
              </Button>
            </CardContent>
          </Card>

          {/* Acceptable Use Policy */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 group-hover:shadow-lg group-hover:shadow-cyan-400/20 transition-all duration-300">
                  <Shield className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
                Acceptable Use Policy
              </CardTitle>
              <CardDescription>
                Guidelines for appropriate use of our platform and services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  Our Acceptable Use Policy ensures that all users can benefit from a secure, 
                  professional environment. This policy prohibits:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Unauthorized access to systems or data</li>
                  <li>Distribution of malicious software</li>
                  <li>Interference with service operations</li>
                  <li>Violation of applicable laws and regulations</li>
                </ul>
                <p className="mb-4">
                  Violations may result in account suspension or termination.
                </p>
                <Link href="/legal/acceptable-use-policy">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Acceptable Use Policy
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Data Processing Agreement */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/20 group"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400/20 to-cyan-500/20 backdrop-blur-sm border border-teal-400/30 group-hover:shadow-lg group-hover:shadow-teal-400/20 transition-all duration-300">
                  <Scale className="h-5 w-5 text-teal-400 group-hover:text-teal-300 transition-colors" />
                </div>
                Data Processing Agreement
              </CardTitle>
              <CardDescription>
                Information about how we process and handle your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  Our Data Processing Agreement outlines the specific terms under which 
                  we process personal and organizational data in compliance with applicable regulations.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Data processing purposes and lawful basis</li>
                  <li>Data retention and deletion policies</li>
                  <li>International data transfers</li>
                  <li>Security measures and breach procedures</li>
                </ul>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-teal-400 text-teal-400 hover:bg-teal-400/10 mt-4"
                  onClick={() => window.open('/legal/Data_Processing_Agreement.html', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Data Processing Agreement
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive Legal Documents */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300">
                  <FileText className="h-5 w-5 text-cyan-400 hover:text-cyan-300 transition-colors" />
                </div>
                Complete Legal Documentation Suite
              </CardTitle>
              <CardDescription>
                Access all comprehensive legal documents, compliance statements, and policy documentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white mb-2">Core Policies</h4>
                  <Link href="/legal/cookie-policy">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      Cookie Policy
                    </Button>
                  </Link>
                  <Link href="/legal/data-security-policy">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      Data Security Policy
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/Vulnerability_Disclosure_Policy.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Vulnerability Disclosure
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white mb-2">Privacy & Data Protection</h4>
                  <Link href="/legal/gdpr-compliance">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      GDPR Compliance
                    </Button>
                  </Link>
                  <Link href="/legal/ccpa-compliance">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      CCPA/CPRA Compliance
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/COPPA_Compliance.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    COPPA Compliance
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/SMS_Messaging_Policy.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    SMS Messaging Policy
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white mb-2">Business & Service Terms</h4>
                  <Link href="/legal/service-level-agreement">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      Service Level Agreement
                    </Button>
                  </Link>
                  <Link href="/legal/refund-policy">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    >
                      <FileText className="h-3 w-3 mr-2" />
                      Refund & Cancellation Policy
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/AI_Ethics_Statement.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    AI Ethics Statement
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-cyan-300 font-semibold">
                      Enterprise-Ready Legal Framework
                    </p>
                    <p className="text-xs text-gray-400">
                      All documents are professionally formatted, legally compliant, and ready for government and educational sector deployment.
                      Last updated: September 6, 2025
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 max-w-2xl mx-auto group"
                style={{
                  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 group-hover:shadow-lg group-hover:shadow-cyan-400/20 transition-all duration-300">
                  <Scale className="h-5 w-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
                Legal Contact
              </CardTitle>
              <CardDescription>
                Questions about our legal policies or need assistance?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Email:</strong> legal@cybersecuredai.com
                </p>
                <p>
                  <strong>General Contact:</strong> one@cybersecuredai.com
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  For urgent legal matters, please visit our{' '}
                  <Link href="/contact">
                    <Button variant="link" className="p-0 h-auto text-cyan-400 hover:text-cyan-300">
                      Contact page
                    </Button>
                  </Link>
                  {' '}to submit a support ticket. We typically respond to legal inquiries within 2-3 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
    </div>
    </MarketingLayout>
  );
}