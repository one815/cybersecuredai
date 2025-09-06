import { Shield, FileText, Users, Scale, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LegalNew() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white marketing-website">
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
          <Card className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
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
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                onClick={() => window.open('/legal/Terms_of_Service.html', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Terms of Service
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Policy */}
          <Card className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
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
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-green-400 text-green-400 hover:bg-green-400/10"
                onClick={() => window.open('/legal/Privacy_Policy.html', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Privacy Policy
              </Button>
            </CardContent>
          </Card>

          {/* Compliance & Regulations */}
          <Card className="bg-slate-800/50 border-cyan-500/30 hover:border-cyan-400/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-400" />
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-orange-400 text-orange-400 hover:bg-orange-400/10"
                  onClick={() => window.open('/legal/FERPA_Compliance.html', '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  FERPA
                </Button>
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
        </div>

        {/* Additional Legal Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle>Acceptable Use Policy</CardTitle>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  onClick={() => window.open('/legal/Acceptable_Use_Policy.html', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Acceptable Use Policy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle>Data Processing Agreement</CardTitle>
              <CardDescription>
                Information about how we process and handle your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  Our Data Processing Agreement outlines our commitment to data protection 
                  and compliance with privacy regulations:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  <li>Data minimization principles</li>
                  <li>Purpose limitation and retention</li>
                  <li>Security measures and encryption</li>
                  <li>International data transfer safeguards</li>
                </ul>
                <p>
                  We ensure your data is processed lawfully, fairly, and transparently.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive Legal Documents */}
        <div className="mt-12">
          <Card className="bg-slate-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-400" />
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/Cookie_Policy.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Cookie Policy
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/Data_Security_Policy.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Data Security Policy
                  </Button>
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/GDPR_Compliance.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    GDPR Compliance
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/CCPA_Compliance.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    CCPA/CPRA Compliance
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/COPPA_Compliance.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    COPPA Compliance
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white mb-2">Business & Service Terms</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/Service_Level_Agreement.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Service Level Agreement
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-700/50"
                    onClick={() => window.open('/legal/Refund_Policy.html', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Refund & Cancellation Policy
                  </Button>
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
          <Card className="bg-slate-800/50 border-cyan-500/30 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Legal Contact</CardTitle>
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
                <p>
                  <strong>Address:</strong> Willow Park, TX
                </p>
                <p className="text-sm text-gray-400 mt-4">
                  For urgent legal matters, please contact us directly via email. 
                  We typically respond to legal inquiries within 2-3 business days.
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
  );
}