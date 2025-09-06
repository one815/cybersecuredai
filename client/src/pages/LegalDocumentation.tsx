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

  const generateAuthorizationHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Letter of Authorization - CyberSecured AI</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');
    body { 
      font-family: 'Noto Sans', sans-serif; 
      margin: 40px; 
      line-height: 1.6; 
      color: #000;
      background: white;
    }
    .header { text-align: center; margin-bottom: 30px; }
    .logo { height: 80px; margin-bottom: 15px; }
    .company-info { margin-bottom: 10px; }
    .date { margin: 20px 0; font-weight: bold; }
    .title { margin: 20px 0; font-weight: bold; font-size: 16px; }
    .content { margin: 15px 0; }
    .program-details { margin: 15px 0; }
    .program-details ul { margin-left: 25px; }
    .signature-section { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 40px; 
      margin-top: 30px; 
    }
    .signature-image { 
      height: 60px; 
      margin-top: 10px; 
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${import.meta.env.BASE_URL}attached_assets/5_1757170718777.png" alt="CyberSecured AI Logo" class="logo">
    <div class="company-info"><strong>CYBERSECURED AI</strong></div>
    <div>Enterprise Cybersecurity Platform</div>
    <div>395 Pitchfork Trail Suite 902, Willow Park, TX 76087 | legal@cybersecuredai.com</div>
  </div>

  <div class="date">${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}</div>

  <div class="title">Letter of Authorization</div>

  <div class="content"><strong>To Whom It May Concern,</strong></div>

  <div class="content">
    This letter is to confirm that we, <strong>CyberSecured AI</strong> are giving permission to file a campaign to Twilio for program <strong>"CyberSecured AI Security Alerts, Threat Notifications & Multi-Factor Authentication (M2FA)"</strong>.
  </div>

  <div class="program-details">
    <strong>Program Details:</strong>
    <ul>
      <li>Company: CyberSecured AI</li>
      <li>Program Name: Security Alerts, Threat Notifications & Multi-Factor Authentication</li>
      <li>Use Case: Critical security alerts, threat intelligence updates, compliance notifications, and multi-factor authentication login codes</li>
      <li>Target Audience: Educational institutions, government organizations, and enterprise clients</li>
      <li>Message Types: Security alerts, system notifications, compliance reminders, M2FA authentication codes</li>
    </ul>
  </div>

  <div class="content">
    If additional information is needed, please contact shortcodes@twilio.com or legal@cybersecuredai.com
  </div>

  <div class="content"><strong>Regards,</strong></div>

  <div class="signature-section">
    <div>
      <strong>Authorized Signer:</strong><br>
      Camilia Anderson, CEO<br>
      CyberSecured AI<br><br>
      <strong>Date:</strong> ${new Date().toLocaleDateString()}<br><br>
      <strong>Signature:</strong><br>
      <img src="${import.meta.env.BASE_URL}attached_assets/sig-CAM_1757171427620.PNG" alt="Camilia Anderson Signature" class="signature-image">
    </div>
    <div>
      <strong>Contact Information:</strong><br>
      Email: legal@cybersecuredai.com<br>
      Website: cybersecuredai.com<br>
      Address: 395 Pitchfork Trail Suite 902<br>
      Willow Park, TX 76087<br><br>
      <strong>Business Registration:</strong><br>
      CyberSecure AI Ltd.<br>
      TX SOS: 806180900
    </div>
  </div>
</body>
</html>`;
  };

  const generateTermsHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>SMS Terms of Service - CyberSecured AI</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');
    body { 
      font-family: 'Noto Sans', sans-serif; 
      margin: 40px; 
      line-height: 1.6; 
      color: #000;
      background: white;
    }
    .header { text-align: center; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .section { margin: 20px 0; }
    .section h3 { font-weight: bold; margin-bottom: 10px; }
    .compliance-notice { 
      background: #e8f5e8; 
      padding: 15px; 
      border-left: 4px solid #4CAF50; 
      margin: 20px 0; 
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">CyberSecured AI SMS Terms of Service</div>
  </div>

  <div class="section">
    <h3>1. Service Description</h3>
    <p>CyberSecured AI provides SMS notifications for critical security alerts, threat intelligence updates, and compliance notifications to opted-in users.</p>
  </div>

  <div class="section">
    <h3>2. Consent and Opt-in</h3>
    <p>By subscribing to our SMS service, you explicitly consent to receive text messages from CyberSecured AI. Message and data rates may apply. You must be 18 years or older or have parental consent.</p>
  </div>

  <div class="section">
    <h3>3. Message Frequency</h3>
    <p>Message frequency varies based on security threat levels and system alerts. You may receive up to 10 messages per month during normal operations, with additional messages during active security incidents.</p>
  </div>

  <div class="section">
    <h3>4. Opt-out Instructions</h3>
    <p>You may opt-out at any time by texting <strong>STOP</strong> to our short code. You may also text <strong>HELP</strong> for customer support. Standard message and data rates may apply.</p>
  </div>

  <div class="section">
    <h3>5. Privacy and Data Protection</h3>
    <p>We collect and use your phone number solely for SMS service delivery. We do not share your information with third parties except as required by law. View our full Privacy Policy at cybersecuredai.com/privacy.</p>
  </div>

  <div class="section">
    <h3>6. Support and Contact</h3>
    <p>For support, text HELP to our short code or email legal@cybersecuredai.com. For technical support with our security platform, visit cybersecuredai.com/support.</p>
  </div>

  <div class="section">
    <h3>7. Liability and Disclaimers</h3>
    <p>SMS alerts are supplementary to your security systems. CyberSecured AI is not liable for delayed messages or network failures. Critical security incidents should be monitored through multiple channels.</p>
  </div>

  <div class="section">
    <h3>8. Terms Modification</h3>
    <p>We may update these terms with 30-day notice via SMS or email. Continued use of the service constitutes acceptance of modified terms.</p>
  </div>

  <div class="compliance-notice">
    <strong>✓ Compliance Notice:</strong> These terms comply with Twilio's industry standards for US Short Code Terms of Service
  </div>
</body>
</html>`;
  };

  const generateOptInHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Opt-in Requirements - CyberSecured AI</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');
    body { 
      font-family: 'Noto Sans', sans-serif; 
      margin: 40px; 
      line-height: 1.6; 
      color: #000;
      background: white;
    }
    .header { text-align: center; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .warning { 
      background: #fff3cd; 
      padding: 15px; 
      border-left: 4px solid #ffc107; 
      margin: 20px 0; 
    }
    .disclaimer { 
      background: #f8f9fa; 
      padding: 15px; 
      margin: 15px 0; 
      border-left: 4px solid #007bff; 
    }
    .disclaimer h4 { margin-top: 0; font-weight: bold; }
    .compliance-notice { 
      background: #e8f5e8; 
      padding: 15px; 
      border-left: 4px solid #4CAF50; 
      margin: 20px 0; 
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">Opt-in Requirements & Disclaimers</div>
    <p>Required disclaimers and consent language per Twilio US Short Code standards.</p>
  </div>

  <div class="warning">
    <strong>⚠ Required Pre-Consent Disclaimers</strong><br>
    The following disclaimers must be presented to users before obtaining consent:
  </div>

  <h3>Consent Language for CyberSecured AI SMS Alerts</h3>

  <div class="disclaimer">
    <h4>Primary Consent Statement:</h4>
    <p><em>"By subscribing, you agree to receive SMS security alerts and notifications from CyberSecured AI. Message and data rates may apply. Message frequency varies based on threat levels. Text STOP to opt-out or HELP for support."</em></p>
  </div>

  <div class="disclaimer">
    <h4>Frequency Disclosure:</h4>
    <p><em>"You may receive up to 10 security alert messages per month during normal operations. During active security incidents, you may receive additional time-sensitive notifications."</em></p>
  </div>

  <div class="disclaimer">
    <h4>Cost Disclosure:</h4>
    <p><em>"Standard message and data rates apply. CyberSecured AI does not charge for SMS alerts, but your carrier's messaging rates will apply."</em></p>
  </div>

  <div class="disclaimer">
    <h4>Opt-out Instructions:</h4>
    <p><em>"You can opt-out at any time by texting STOP to our short code. For help, text HELP or contact legal@cybersecuredai.com."</em></p>
  </div>

  <div class="disclaimer">
    <h4>Age and Consent Requirements:</h4>
    <p><em>"You must be 18 years or older to subscribe. If under 18, parental consent is required. By subscribing, you confirm you meet these age requirements."</em></p>
  </div>

  <div class="disclaimer">
    <h4>Terms and Privacy:</h4>
    <p><em>"By subscribing, you agree to our SMS Terms of Service and Privacy Policy available at cybersecuredai.com/legal. We will not share your phone number with third parties."</em></p>
  </div>

  <div class="compliance-notice">
    <strong>✓ Compliance Notice:</strong> All disclaimers comply with Twilio's opt-in requirements for US Short Codes
  </div>
</body>
</html>`;
  };

  const generateCampaignHTML = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Campaign Mockup - CyberSecured AI</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap');
    body { 
      font-family: 'Noto Sans', sans-serif; 
      margin: 40px; 
      line-height: 1.6; 
      color: #000;
      background: white;
    }
    .header { text-align: center; margin-bottom: 30px; }
    .title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .section { margin: 30px 0; }
    .section h3 { font-weight: bold; margin-bottom: 15px; color: #0066cc; }
    .message-sample { 
      background: #f8f9fa; 
      padding: 15px; 
      margin: 10px 0; 
      border-left: 4px solid #6c757d; 
    }
    .message-sample.welcome { border-left-color: #6c757d; }
    .message-sample.critical { border-left-color: #dc3545; }
    .message-sample.threat { border-left-color: #ffc107; }
    .message-sample.system { border-left-color: #0dcaf0; }
    .message-sample.auth { border-left-color: #28a745; }
    .message-type { font-size: 12px; color: #666; margin-bottom: 5px; }
    .script-box { 
      background: #f8f9fa; 
      padding: 20px; 
      margin: 15px 0; 
      border-left: 4px solid #0066cc;
    }
    .opt-out-flow { 
      background: #ffebee; 
      padding: 15px; 
      margin: 10px 0; 
      border-left: 4px solid #f44336; 
    }
    .compliance-notice { 
      background: #e8f5e8; 
      padding: 15px; 
      border-left: 4px solid #4CAF50; 
      margin: 20px 0; 
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">SMS Campaign Mockup & Opt-in Flow</div>
    <p>Visual demonstration of how users will encounter and consent to SMS notifications.</p>
  </div>

  <div class="section">
    <h3>Dashboard Opt-in Flow</h3>
    <div class="script-box">
      <h4>🛡 Enable SMS Security Alerts</h4>
      <p>Stay informed about critical security threats and system alerts via SMS.</p>
      <ul>
        <li>Receive up to 10 security alerts per month</li>
        <li>Standard message and data rates apply</li>
        <li>Text STOP to opt-out anytime</li>
        <li>Must be 18+ or have parental consent</li>
      </ul>
      <p><strong>☑ I agree to receive SMS alerts and accept the Terms of Service</strong></p>
      <p><strong>[Enable SMS Alerts]</strong></p>
    </div>
  </div>

  <div class="section">
    <h3>Sample SMS Messages</h3>
    
    <div class="message-sample welcome">
      <div class="message-type">Welcome Message</div>
      <p>Welcome to CyberSecured AI SMS alerts! You'll receive critical security notifications. Reply STOP to opt-out, HELP for support. Msg&data rates may apply.</p>
    </div>
    
    <div class="message-sample critical">
      <div class="message-type">Critical Alert</div>
      <p>🚨 CRITICAL: Suspicious login detected from IP 192.168.1.100. Login to cybersecuredai.com/dashboard to review. CyberSecured AI</p>
    </div>
    
    <div class="message-sample threat">
      <div class="message-type">Threat Alert</div>
      <p>⚠️ New threat detected: APT29 indicators. 5 systems affected. View details: cybersecuredai.com/threats CyberSecured AI</p>
    </div>
    
    <div class="message-sample system">
      <div class="message-type">System Notification</div>
      <p>ℹ️ Scheduled maintenance tonight 2-4 AM EST. Dashboard temporarily unavailable. CyberSecured AI</p>
    </div>
    
    <div class="message-sample auth">
      <div class="message-type">M2FA Authentication Code</div>
      <p>Your CyberSecured AI login code: 847392. Valid for 5 minutes. Do not share this code. Reply STOP to opt-out.</p>
    </div>
  </div>

  <div class="section">
    <h3>Opt-Out Flows</h3>
    
    <h4>Security Alerts Opt-Out Process</h4>
    <div class="opt-out-flow">
      <strong>1. User Sends:</strong> STOP<br>
      <strong>2. Auto-Reply:</strong> You have been unsubscribed from CyberSecured AI security alerts. You will no longer receive threat notifications. Reply START to resubscribe.<br>
      <strong>3. Confirmation:</strong> ✅ Successfully opted out of security alerts. Account updated.
    </div>
    
    <h4>M2FA Opt-Out Process</h4>
    <div class="opt-out-flow">
      <strong>1. Dashboard Setting:</strong> User disables SMS M2FA in account settings or texts STOP to opt-out<br>
      <strong>2. Auto-Reply:</strong> SMS Multi-Factor Authentication disabled. You will no longer receive login codes via SMS. Enable in account settings if needed.<br>
      <strong>3. Security Notice:</strong> ⚠️ Important: Your account security is reduced without M2FA enabled. Consider alternative authentication methods.
    </div>
  </div>

  <div class="section">
    <h3>Verbal Opt-in Scripts</h3>
    
    <div class="script-box">
      <h4>Security Alerts Script</h4>
      <p><em>"Would you like to receive SMS security alerts from CyberSecured AI? You'll get critical threat notifications and system updates sent directly to your phone. You can receive up to 10 messages per month during normal operations, with additional alerts during security incidents. Standard message and data rates apply. You can opt-out anytime by texting STOP. You must be 18 or older to subscribe. Do you consent to receive these SMS alerts?"</em></p>
    </div>
    
    <div class="script-box">
      <h4>M2FA Authentication Script</h4>
      <p><em>"Would you like to enable SMS-based multi-factor authentication for your CyberSecured AI account? You'll receive verification codes for secure login. Message frequency varies with your login activity. Standard message and data rates apply. You can disable this feature anytime in your account settings or by texting STOP. You must be 18 or older to enable this feature. Do you consent to receive M2FA codes via SMS?"</em></p>
    </div>
  </div>

  <div class="compliance-notice">
    <strong>✓ Compliance Notice:</strong> Campaign mockup meets all Twilio US Short Code advertising and consent collection requirements
  </div>
</body>
</html>`;
  };

  const downloadAsPDF = (htmlContent: string, filename: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
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
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 mb-8">
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
            <TabsTrigger value="legal" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Legal Documents
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
                      generateAuthorizationHTML(),
                      'CyberSecured_AI_Letter_of_Authorization.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => downloadAsPDF(
                      generateAuthorizationHTML(),
                      'CyberSecured_AI_Letter_of_Authorization.pdf'
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
                      generateTermsHTML(),
                      'CyberSecured_AI_SMS_Terms_of_Service.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => downloadAsPDF(
                      generateTermsHTML(),
                      'CyberSecured_AI_SMS_Terms_of_Service.pdf'
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
                      generateOptInHTML(),
                      'CyberSecured_AI_Opt_In_Requirements.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => downloadAsPDF(
                      generateOptInHTML(),
                      'CyberSecured_AI_Opt_In_Requirements.pdf'
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
                      generateCampaignHTML(),
                      'CyberSecured_AI_Campaign_Mockup.pdf'
                    )}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => downloadAsPDF(
                      generateCampaignHTML(),
                      'CyberSecured_AI_Campaign_Mockup.pdf'
                    )}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Version
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comprehensive Legal Documents */}
          <TabsContent value="legal">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cyan-400" />
                  Comprehensive Legal Documentation Suite
                </CardTitle>
                <CardDescription>
                  Complete legal documentation for government and educational compliance including privacy policies, 
                  security frameworks, and regulatory compliance statements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Core Privacy & Terms */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Core Privacy & Terms
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Privacy_Policy.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Privacy Policy
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Terms_of_Service.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Terms of Service
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Cookie_Policy.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Cookie Policy
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Acceptable_Use_Policy.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Acceptable Use Policy
                      </Button>
                    </div>
                  </div>

                  {/* Data Protection Compliance */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Data Protection
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/GDPR_Compliance.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        GDPR Compliance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/CCPA_Compliance.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        CCPA/CPRA Compliance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Data_Security_Policy.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Data Security Policy
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Vulnerability_Disclosure_Policy.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Vulnerability Disclosure
                      </Button>
                    </div>
                  </div>

                  {/* Government Compliance */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Government Compliance
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/FedRAMP_Compliance.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        FedRAMP Compliance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/FERPA_Compliance.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        FERPA Compliance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/COPPA_Compliance.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        COPPA Compliance
                      </Button>
                    </div>
                  </div>

                  {/* Business Policies */}
                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Business Policies
                    </h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Service_Level_Agreement.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Service Level Agreement
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/Refund_Policy.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Refund & Cancellation
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-slate-600 hover:bg-slate-600/50"
                        onClick={() => window.open('/legal/AI_Ethics_Statement.html', '_blank')}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        AI Ethics Statement
                      </Button>
                    </div>
                  </div>

                  {/* Quick Access Links */}
                  <div className="bg-slate-700/50 p-6 rounded-lg md:col-span-2 lg:col-span-1">
                    <h3 className="text-lg font-semibold mb-4 text-cyan-400 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Direct Access
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-300 mb-3">
                        All legal documents are available as standalone HTML files that can be directly accessed, 
                        printed, or converted to PDF format.
                      </p>
                      <div className="text-xs text-gray-400 space-y-2">
                        <p><strong>Password:</strong> CyberCypher101819</p>
                        <p><strong>Last Updated:</strong> September 6, 2025</p>
                        <p><strong>Document Count:</strong> 15+ comprehensive policies</p>
                        <p><strong>Compliance:</strong> GDPR, CCPA, FERPA, FedRAMP, COPPA</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Compliance Summary */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      <h4 className="text-lg font-semibold text-green-400">Education Sector Ready</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>✓ FERPA compliant student data protection</li>
                      <li>✓ COPPA compliance for K-12 environments</li>
                      <li>✓ Student Data Privacy Pledge alignment</li>
                      <li>✓ Academic calendar-aligned service terms</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="h-6 w-6 text-blue-400" />
                      <h4 className="text-lg font-semibold text-blue-400">Government Sector Ready</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>✓ FedRAMP authorization in progress</li>
                      <li>✓ FISMA compliance documentation</li>
                      <li>✓ Section 508 accessibility compliance</li>
                      <li>✓ Enhanced security controls and monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-cyan-400" />
                    <p className="text-sm text-cyan-300">
                      <strong>Complete Legal Suite:</strong> All documents are professionally formatted, 
                      legally compliant, and ready for regulatory review. Each document includes contact information, 
                      compliance statements, and clear user rights information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}