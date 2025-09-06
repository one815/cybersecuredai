import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, MessageSquare, Shield, CheckCircle, AlertCircle } from "lucide-react";

export default function Legal() {
  const [activeTab, setActiveTab] = useState("authorization");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white marketing-website">
      {/* Header */}
      <div className="bg-black/20 border-b border-cyan-500/30">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 border-cyan-400 text-cyan-400">
              <Shield className="h-4 w-4 mr-2" />
              Legal Documentation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
              Legal Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive legal documentation for Twilio SMS services, including authorization letters, 
              terms of service, and compliance requirements for short code setup.
            </p>
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
                <div className="bg-white text-black p-8 rounded-lg font-mono text-sm leading-relaxed">
                  <div className="text-center mb-8">
                    <img src="/api/placeholder/200/80" alt="CyberSecured AI Logo" className="mx-auto mb-4" />
                    <div className="text-lg font-bold">CYBERSECURED AI</div>
                    <div>Enterprise Cybersecurity Platform</div>
                    <div>Willow Park, TX | one@cybersecuredai.com</div>
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
                    This letter is to confirm that we, <strong>CyberSecured AI</strong> are giving permission to file a campaign to Twilio for program <strong>"CyberSecured AI Security Alerts & Threat Notifications"</strong>.
                  </div>

                  <div className="mb-6">
                    <strong>Program Details:</strong>
                    <ul className="list-disc ml-6 mt-2">
                      <li>Company: CyberSecured AI</li>
                      <li>Program Name: Security Alerts & Threat Notifications</li>
                      <li>Use Case: Critical security alerts, threat intelligence updates, and compliance notifications</li>
                      <li>Target Audience: Educational institutions, government organizations, and enterprise clients</li>
                      <li>Message Types: Security alerts, system notifications, compliance reminders</li>
                    </ul>
                  </div>

                  <div className="mb-8">
                    If additional information is needed, please contact shortcodes@twilio.com or one@cybersecuredai.com
                  </div>

                  <div className="mb-4">
                    <strong>Regards,</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <strong>Name & Title:</strong><br />
                      Chief Executive Officer<br />
                      CyberSecured AI<br /><br />
                      <strong>Date:</strong> {new Date().toLocaleDateString()}<br /><br />
                      <strong>Signature:</strong> _________________________
                    </div>
                    <div>
                      <strong>Contact Information:</strong><br />
                      Email: one@cybersecuredai.com<br />
                      Website: cybersecuredai.com<br />
                      Address: Willow Park, TX<br /><br />
                      <strong>Business Registration:</strong><br />
                      Enterprise Cybersecurity Solutions
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                    <FileText className="h-4 w-4 mr-2" />
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opt-in Requirements */}
          <TabsContent value="optin">
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaign Mockup */}
          <TabsContent value="campaign">
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

                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-cyan-400">Verbal Opt-in Script</h3>
                  <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-gray-300 italic">
                      "Would you like to receive SMS security alerts from CyberSecured AI? You'll get critical 
                      threat notifications and system updates sent directly to your phone. You can receive up 
                      to 10 messages per month during normal operations, with additional alerts during security 
                      incidents. Standard message and data rates apply. You can opt-out anytime by texting STOP. 
                      You must be 18 or older to subscribe. Do you consent to receive these SMS alerts?"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-sm text-green-300">
                    Campaign mockup meets all Twilio US Short Code advertising and consent collection requirements
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}