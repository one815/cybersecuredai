import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, MessageSquare, Shield, CheckCircle, AlertCircle, Lock, Printer, X } from "lucide-react";

export default function LegalDocumentation() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("authorization");

  const downloadAsPDF = (content: string, filename: string) => {
    // Create a new window with the content for PDF generation
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${filename}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');
            body { font-family: 'Noto Sans', sans-serif; margin: 40px; line-height: 1.6; }
            .logo { text-align: center; margin-bottom: 20px; }
            .signature { margin-top: 10px; }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const printDocument = (content: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>CyberSecured AI Legal Document</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');
            body { font-family: 'Noto Sans', sans-serif; margin: 40px; line-height: 1.6; }
            .logo { text-align: center; margin-bottom: 20px; }
            .signature { margin-top: 10px; }
          </style>
        </head>
        <body>
          ${content}
          <script>window.print(); window.close();</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "CyberCypher101819") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
        <Card className="bg-slate-800/50 border-cyan-500/30 w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full w-fit">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Protected Legal Documentation</CardTitle>
            <CardDescription>
              Enter the password to access confidential legal documents and compliance materials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-cyan-500/30 text-white placeholder-gray-400"
                />
              </div>
              <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                <Shield className="h-4 w-4 mr-2" />
                Access Documentation
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white marketing-website">
      {/* Header */}
      <div className="bg-black/20 border-b border-cyan-500/30">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 border-cyan-400 text-cyan-400">
              <Shield className="h-4 w-4 mr-2" />
              Confidential Legal Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Legal Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive legal documentation for Twilio SMS services, including authorization letters, 
              terms of service, and compliance requirements for short code setup.
            </p>
            <Button 
              onClick={() => setIsAuthenticated(false)} 
              variant="outline" 
              className="mt-4 border-red-400 text-red-400 hover:bg-red-400/10"
            >
              <Lock className="h-4 w-4 mr-2" />
              Lock Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 mb-8">
            <TabsTrigger value="authorization" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Authorization Letter
            </TabsTrigger>
            <TabsTrigger value="terms" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              SMS Terms of Service
            </TabsTrigger>
            <TabsTrigger value="optin" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Opt-in Requirements
            </TabsTrigger>
            <TabsTrigger value="campaign" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Campaign Mockup
            </TabsTrigger>
          </TabsList>

          {/* Authorization Letter */}
          <TabsContent value="authorization">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cyan-400" />
                  Letter of Authorization - Twilio Short Code Setup
                </CardTitle>
                <CardDescription>
                  Official authorization letter for CyberSecured AI SMS campaign setup with Twilio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white text-black p-8 rounded-lg text-sm leading-relaxed" style={{ fontFamily: "'Nata Sans', 'Noto Sans', sans-serif" }}>
                  <div className="text-center mb-8">
                    <div className="mx-auto mb-4">
                      <img 
                        src={import.meta.env.BASE_URL + "attached_assets/5_1757170718777.png"}
                        alt="CyberSecured AI Logo" 
                        className="h-20 mx-auto"
                      />
                    </div>
                    <div className="text-lg font-bold">CYBERSECURED AI</div>
                    <div>Enterprise Cybersecurity Platform</div>
                    <div>395 Pitchfork Trail Suite 902, Willow Park, TX 76087 | legal@cybersecuredai.com</div>
                  </div>

                  <div className="mb-6">
                    <strong>{new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</strong>
                  </div>

                  <div className="mb-6">
                    <strong>Letter of Authorization</strong>
                  </div>

                  <div className="mb-6">
                    <strong>To Whom It May Concern,</strong>
                  </div>

                  <div className="mb-6">
                    This letter is to confirm that we, <strong>CyberSecured AI</strong> are giving permission to file a campaign to Twilio for program <strong>"CyberSecured AI Security Alerts, Threat Notifications & Multi-Factor Authentication (M2FA)"</strong>.
                  </div>

                  <div className="mb-6">
                    <strong>Program Details:</strong>
                    <ul className="list-disc ml-6 mt-2">
                      <li>Company: CyberSecured AI</li>
                      <li>Program Name: Security Alerts, Threat Notifications & Multi-Factor Authentication</li>
                      <li>Use Case: Critical security alerts, threat intelligence updates, compliance notifications, and multi-factor authentication login codes</li>
                      <li>Target Audience: Educational institutions, government organizations, and enterprise clients</li>
                      <li>Message Types: Security alerts, system notifications, compliance reminders, M2FA authentication codes</li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    If additional information is needed, please contact shortcodes@twilio.com or legal@cybersecuredai.com
                  </div>

                  <div className="mb-4">
                    <strong>Regards,</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <strong>Authorized Signer:</strong><br />
                      Camilia Anderson, CEO<br />
                      CyberSecured AI<br /><br />
                      <strong>Date:</strong> {new Date().toLocaleDateString()}<br /><br />
                      <strong>Signature:</strong><br />
                      <img 
                        src={import.meta.env.BASE_URL + "attached_assets/sig-CAM_1757171427620.PNG"}
                        alt="Camilia Anderson Signature" 
                        className="h-16 mt-2"
                      />
                    </div>
                    <div>
                      <strong>Contact Information:</strong><br />
                      Email: legal@cybersecuredai.com<br />
                      Website: cybersecuredai.com<br />
                      Address: 395 Pitchfork Trail Suite 902<br />
                      Willow Park, TX 76087<br /><br />
                      <strong>Business Registration:</strong><br />
                      CyberSecure AI Ltd.<br />
                      TX SOS: 806180900
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => downloadAsPDF(
                      document.querySelector('.bg-white.text-black')?.outerHTML || '',
                      'CyberSecured_AI_Letter_of_Authorization.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => printDocument(
                      document.querySelector('.bg-white.text-black')?.outerHTML || ''
                    )}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Version
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMS Terms of Service */}
          <TabsContent value="terms">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  SMS Campaign Terms of Service
                </CardTitle>
                <CardDescription>
                  Industry-standard terms of service for US Short Code SMS campaigns per Twilio requirements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">CyberSecured AI SMS Terms of Service</h3>
                  
                  <div className="space-y-4 text-gray-300">
                    <div>
                      <h4 className="font-semibold text-white mb-2">1. Service Description</h4>
                      <p>CyberSecured AI provides SMS notifications for critical security alerts, threat intelligence updates, and compliance notifications to opted-in users.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">2. Consent and Opt-in</h4>
                      <p>By subscribing to our SMS service, you explicitly consent to receive text messages from CyberSecured AI. Message and data rates may apply. You must be 18 years or older or have parental consent.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">3. Message Frequency</h4>
                      <p>Message frequency varies based on security threat levels and system alerts. You may receive up to 10 messages per month during normal operations, with additional messages during active security incidents.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">4. Opt-out Instructions</h4>
                      <p>You may opt-out at any time by texting <strong>STOP</strong> to our short code. You may also text <strong>HELP</strong> for customer support. Standard message and data rates may apply.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">5. Privacy and Data Protection</h4>
                      <p>We collect and use your phone number solely for SMS service delivery. We do not share your information with third parties except as required by law. View our full Privacy Policy at cybersecuredai.com/privacy.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">6. Support and Contact</h4>
                      <p>For support, text HELP to our short code or email one@cybersecuredai.com. For technical support with our security platform, visit cybersecuredai.com/support.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">7. Liability and Disclaimers</h4>
                      <p>SMS alerts are supplementary to your security systems. CyberSecured AI is not liable for delayed messages or network failures. Critical security incidents should be monitored through multiple channels.</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">8. Terms Modification</h4>
                      <p>We may update these terms with 30-day notice via SMS or email. Continued use of the service constitutes acceptance of modified terms.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-sm text-green-300">
                    These terms comply with Twilio's industry standards for US Short Code Terms of Service
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => downloadAsPDF(
                      document.querySelector('[data-tab="terms"] .bg-slate-700\\/50')?.outerHTML || '',
                      'CyberSecured_AI_SMS_Terms_of_Service.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => printDocument(
                      document.querySelector('[data-tab="terms"] .bg-slate-700\\/50')?.outerHTML || ''
                    )}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Version
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opt-in Requirements */}
          <TabsContent value="optin" data-tab="optin">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-cyan-400" />
                  Opt-in Requirements & Disclaimers
                </CardTitle>
                <CardDescription>
                  Required disclaimers and consent language per Twilio US Short Code standards.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-amber-400" />
                    <h3 className="font-semibold text-amber-400">Required Pre-Consent Disclaimers</h3>
                  </div>
                  <p className="text-sm text-amber-200">
                    The following disclaimers must be presented to users before obtaining consent:
                  </p>
                </div>

                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-4">Consent Language for CyberSecured AI SMS Alerts</h4>
                  
                  <div className="space-y-4 text-gray-300">
                    <div className="p-4 bg-slate-800/50 rounded border-l-4 border-cyan-400">
                      <h5 className="font-semibold text-white mb-2">Primary Consent Statement:</h5>
                      <p className="italic">
                        "By subscribing, you agree to receive SMS security alerts and notifications from CyberSecured AI. 
                        Message and data rates may apply. Message frequency varies based on threat levels. 
                        Text STOP to opt-out or HELP for support."
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded border-l-4 border-green-400">
                      <h5 className="font-semibold text-white mb-2">Frequency Disclosure:</h5>
                      <p className="italic">
                        "You may receive up to 10 security alert messages per month during normal operations. 
                        During active security incidents, you may receive additional time-sensitive notifications."
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded border-l-4 border-orange-400">
                      <h5 className="font-semibold text-white mb-2">Cost Disclosure:</h5>
                      <p className="italic">
                        "Standard message and data rates apply. CyberSecured AI does not charge for SMS alerts, 
                        but your carrier's messaging rates will apply."
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded border-l-4 border-purple-400">
                      <h5 className="font-semibold text-white mb-2">Opt-out Instructions:</h5>
                      <p className="italic">
                        "You can opt-out at any time by texting STOP to our short code. 
                        For help, text HELP or contact one@cybersecuredai.com."
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded border-l-4 border-red-400">
                      <h5 className="font-semibold text-white mb-2">Age and Consent Requirements:</h5>
                      <p className="italic">
                        "You must be 18 years or older to subscribe. If under 18, parental consent is required. 
                        By subscribing, you confirm you meet these age requirements."
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded border-l-4 border-blue-400">
                      <h5 className="font-semibold text-white mb-2">Terms and Privacy:</h5>
                      <p className="italic">
                        "By subscribing, you agree to our SMS Terms of Service and Privacy Policy available at 
                        cybersecuredai.com/legal. We will not share your phone number with third parties."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <p className="text-sm text-blue-300">
                    All disclaimers comply with Twilio's opt-in requirements for US Short Codes
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => downloadAsPDF(
                      document.querySelector('[data-tab="optin"]')?.innerHTML || '',
                      'CyberSecured_AI_Opt_In_Requirements.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => printDocument(
                      document.querySelector('[data-tab="optin"]')?.innerHTML || ''
                    )}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Version
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaign Mockup */}
          <TabsContent value="campaign" data-tab="campaign">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-400" />
                  SMS Campaign Mockup & Opt-in Flow
                </CardTitle>
                <CardDescription>
                  Visual demonstration of how users will encounter and consent to SMS notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Opt-in Flow Mockup */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400">Dashboard Opt-in Flow</h3>
                    
                    <div className="bg-slate-900 p-4 rounded-lg border border-cyan-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="text-xs text-gray-400 ml-2">cybersecuredai.com/dashboard</div>
                      </div>
                      
                      <div className="bg-slate-800 p-4 rounded border border-amber-400">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="h-5 w-5 text-amber-400" />
                          <h4 className="font-semibold text-amber-400">Enable SMS Security Alerts</h4>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">
                          Stay informed about critical security threats and system alerts via SMS.
                        </p>
                        
                        <div className="space-y-2 text-xs text-gray-400 mb-4">
                          <p>• Receive up to 10 security alerts per month</p>
                          <p>• Standard message and data rates apply</p>
                          <p>• Text STOP to opt-out anytime</p>
                          <p>• Must be 18+ or have parental consent</p>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <input type="checkbox" className="rounded border-gray-400" />
                          <label className="text-xs text-gray-300">
                            I agree to receive SMS alerts and accept the Terms of Service
                          </label>
                        </div>
                        
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-sm">
                          Enable SMS Alerts
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Sample Messages */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400">Sample SMS Messages</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-900 p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Welcome Message</div>
                        <p className="text-sm text-white">
                          Welcome to CyberSecured AI SMS alerts! You'll receive critical security notifications. 
                          Reply STOP to opt-out, HELP for support. Msg&data rates may apply.
                        </p>
                      </div>
                      
                      <div className="bg-red-900/30 p-3 rounded-lg border border-red-500/30">
                        <div className="text-xs text-red-400 mb-1">Critical Alert</div>
                        <p className="text-sm text-white">
                          🚨 CRITICAL: Suspicious login detected from IP 192.168.1.100. 
                          Login to cybersecuredai.com/dashboard to review. CyberSecured AI
                        </p>
                      </div>
                      
                      <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/30">
                        <div className="text-xs text-amber-400 mb-1">Threat Alert</div>
                        <p className="text-sm text-white">
                          ⚠️ New threat detected: APT29 indicators. 5 systems affected. 
                          View details: cybersecuredai.com/threats CyberSecured AI
                        </p>
                      </div>
                      
                      <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                        <div className="text-xs text-blue-400 mb-1">System Notification</div>
                        <p className="text-sm text-white">
                          ℹ️ Scheduled maintenance tonight 2-4 AM EST. Dashboard temporarily unavailable. 
                          CyberSecured AI
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* M2FA Login Mockup */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400">M2FA Login Flow</h3>
                    
                    <div className="bg-slate-900 p-4 rounded-lg border border-green-500/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="text-xs text-gray-400 ml-2">cybersecuredai.com/login</div>
                      </div>
                      
                      <div className="bg-slate-800 p-4 rounded border border-green-400">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="h-5 w-5 text-green-400" />
                          <h4 className="font-semibold text-green-400">Multi-Factor Authentication</h4>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">
                          Enter the 6-digit code sent to your mobile device to complete login.
                        </p>
                        
                        <div className="space-y-3">
                          <div className="bg-slate-900 p-3 rounded">
                            <div className="text-xs text-green-400 mb-1">SMS Code Sent</div>
                            <div className="flex gap-2">
                              {[...Array(6)].map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-slate-700 border border-green-400 rounded text-center flex items-center justify-center text-white">
                                  {i < 3 ? Math.floor(Math.random() * 10) : ''}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
                            Verify & Login
                          </Button>
                          <p className="text-xs text-gray-400 text-center">
                            Didn't receive code? <span className="text-green-400">Resend SMS</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* M2FA Sample Messages */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400">M2FA SMS Messages</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-900 p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Authentication Code</div>
                        <p className="text-sm text-white">
                          Your CyberSecured AI login code: 847392. Valid for 5 minutes. 
                          Do not share this code. Reply STOP to opt-out.
                        </p>
                      </div>
                      
                      <div className="bg-slate-900 p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Login Alert</div>
                        <p className="text-sm text-white">
                          New login to your CyberSecured AI account from Chrome on Windows. 
                          If this wasn't you, secure your account immediately.
                        </p>
                      </div>
                      
                      <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/30">
                        <div className="text-xs text-amber-400 mb-1">Security Notice</div>
                        <p className="text-sm text-white">
                          ⚠️ Multiple failed login attempts detected. Your account has been 
                          temporarily locked. Contact support if needed.
                        </p>
                      </div>
                      
                      <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                        <div className="text-xs text-blue-400 mb-1">Account Recovery</div>
                        <p className="text-sm text-white">
                          Password reset requested. Your verification code: 293847. 
                          Valid for 10 minutes. CyberSecured AI
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400">Verbal Opt-in Scripts</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Security Alerts Script</h4>
                      <p className="text-gray-300 italic text-sm">
                        "Would you like to receive SMS security alerts from CyberSecured AI? You'll get critical 
                        threat notifications and system updates sent directly to your phone. You can receive up 
                        to 10 messages per month during normal operations, with additional alerts during security 
                        incidents. Standard message and data rates apply. You can opt-out anytime by texting STOP. 
                        You must be 18 or older to subscribe. Do you consent to receive these SMS alerts?"
                      </p>
                    </div>
                    
                    <div className="bg-slate-800 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">M2FA Authentication Script</h4>
                      <p className="text-gray-300 italic text-sm">
                        "Would you like to enable SMS-based multi-factor authentication for your CyberSecured AI account? 
                        You'll receive verification codes for secure login. Message frequency varies with your login activity. 
                        Standard message and data rates apply. You can disable this feature anytime in your account settings 
                        or by texting STOP. You must be 18 or older to enable this feature. Do you consent to receive M2FA codes via SMS?"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400">Opt-Out Flows</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Security Alerts Opt-Out */}
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-400 mb-3">Security Alerts Opt-Out Process</h4>
                      
                      <div className="space-y-3">
                        <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                          <div className="text-xs text-red-400 mb-1">User Sends</div>
                          <p className="text-sm text-white">STOP</p>
                        </div>
                        
                        <div className="bg-slate-900 p-3 rounded">
                          <div className="text-xs text-gray-400 mb-1">Auto-Reply</div>
                          <p className="text-sm text-white">
                            You have been unsubscribed from CyberSecured AI security alerts. 
                            You will no longer receive threat notifications. Reply START to resubscribe.
                          </p>
                        </div>
                        
                        <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                          <div className="text-xs text-green-400 mb-1">Confirmation</div>
                          <p className="text-sm text-white">
                            ✅ Successfully opted out of security alerts. Account updated.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* M2FA Opt-Out */}
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-400 mb-3">M2FA Opt-Out Process</h4>
                      
                      <div className="space-y-3">
                        <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                          <div className="text-xs text-orange-400 mb-1">Dashboard Setting</div>
                          <p className="text-sm text-white">
                            User disables SMS M2FA in account settings or texts STOP to opt-out
                          </p>
                        </div>
                        
                        <div className="bg-slate-900 p-3 rounded">
                          <div className="text-xs text-gray-400 mb-1">Auto-Reply</div>
                          <p className="text-sm text-white">
                            SMS Multi-Factor Authentication disabled. You will no longer receive 
                            login codes via SMS. Enable in account settings if needed.
                          </p>
                        </div>
                        
                        <div className="bg-amber-900/20 p-3 rounded border border-amber-500/30">
                          <div className="text-xs text-amber-400 mb-1">Security Notice</div>
                          <p className="text-sm text-white">
                            ⚠️ Important: Your account security is reduced without M2FA enabled. 
                            Consider alternative authentication methods.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-sm text-green-300">
                    Campaign mockup meets all Twilio US Short Code advertising and consent collection requirements
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button 
                    className="bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => downloadAsPDF(
                      document.querySelector('[data-tab="campaign"]')?.innerHTML || '',
                      'CyberSecured_AI_Campaign_Mockup.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => printDocument(
                      document.querySelector('[data-tab="campaign"]')?.innerHTML || ''
                    )}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Version
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}