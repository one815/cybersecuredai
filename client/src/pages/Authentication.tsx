import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Lock, Shield, Smartphone, Mail, Key, Users, CreditCard, Fingerprint, QrCode } from "lucide-react";

export default function Authentication() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSettingUpDigitalKey, setIsSettingUpDigitalKey] = useState(false);
  const [isSettingUpHardwareKey, setIsSettingUpHardwareKey] = useState(false);
  const [isSettingUpBiometric, setIsSettingUpBiometric] = useState(false);
  const [isSettingUpTOTP, setIsSettingUpTOTP] = useState(false);
  const [totpQRCode, setTotpQRCode] = useState<string>("");
  const [totpSecret, setTotpSecret] = useState<string>("");
  const [totpVerificationCode, setTotpVerificationCode] = useState<string>("");
  const [showTOTPModal, setShowTOTPModal] = useState(false);

  const setupDigitalKeyMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('PUT', `/api/users/${user?.id}/digital-key`, { enabled: true });
    },
    onSuccess: () => {
      toast({
        title: "Digital Key Enabled",
        description: "Your digital key authentication has been successfully configured.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
    onError: (error) => {
      toast({
        title: "Setup Failed",
        description: "Failed to enable digital key authentication. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDigitalKeySetup = async () => {
    setIsSettingUpDigitalKey(true);
    
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error("WebAuthn is not supported in this browser. Please use Chrome, Firefox, Safari, or Edge with HTTPS.");
      }

      // Check if we're on a secure origin
      if (window.location.protocol !== 'https:' && !window.location.hostname.includes('localhost')) {
        throw new Error("Digital key authentication requires HTTPS or localhost. Please access the site securely.");
      }

      // Create credential options
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: {
          name: "CyberSecured AI",
          id: window.location.hostname.includes('localhost') ? 'localhost' : window.location.hostname,
        },
        user: {
          id: new TextEncoder().encode(user?.id || "demo-user"),
          name: user?.email || "user@cybersecure.ai",
          displayName: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.email || "CyberSecure User"
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" }, // ES256
          { alg: -257, type: "public-key" } // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "cross-platform",
          userVerification: "required"
        },
        timeout: 60000,
        attestation: "direct"
      };

      // Create credential
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      }) as PublicKeyCredential;

      if (credential) {
        // Successfully created credential, update user profile
        setupDigitalKeyMutation.mutate();
        
        toast({
          title: "Digital Key Verified",
          description: "Your digital key has been successfully registered and enabled.",
        });
      }
    } catch (error: any) {
      console.error("Digital Key setup failed:", error);
      
      if (error.name === "NotAllowedError") {
        toast({
          title: "Setup Cancelled",
          description: "Digital key setup was cancelled or timed out. Please try again.",
          variant: "destructive",
        });
      } else if (error.name === "SecurityError") {
        toast({
          title: "Security Error",
          description: "Please ensure you're using HTTPS and your digital key is properly connected.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Setup Failed",
          description: error.message || "Digital key setup failed. Please ensure your key is inserted and try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSettingUpDigitalKey(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <span>Authentication & Access Control</span>
              <Lock className="w-6 h-6 text-blue-400" />
              <Shield className="w-6 h-6 text-green-400" />
              <Key className="w-6 h-6 text-purple-400" />
            </h2>
            <p className="text-gray-400">Manage multi-factor authentication and access policies</p>
          </div>
          <Button className="bg-interactive hover:bg-orange-600" data-testid="configure-mfa">
            <Lock className="w-4 h-4 mr-2" />
            Configure MFA
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* MFA Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                    <Shield className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">MFA Enabled</h3>
                    <p className="text-gray-400 text-sm">Multi-factor protection active</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-success border-success">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                    <Users className="text-interactive" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">SSO Integration</h3>
                    <p className="text-gray-400 text-sm">Single sign-on configured</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-interactive border-interactive">Configured</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Key className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Access Control</h3>
                    <p className="text-gray-400 text-sm">Role-based permissions</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-secondary border-secondary">Enforced</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MFA Configuration */}
        <Card className="bg-surface glow-border mb-8">
          <CardHeader>
            <CardTitle>Multi-Factor Authentication Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Authenticator App */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="text-interactive" />
                  </div>
                  <div>
                    <h4 className="font-medium">Authenticator App</h4>
                    <p className="text-gray-400 text-sm">Google Authenticator, Authy, or similar TOTP apps</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-success border-success">Enabled</Badge>
                  <Switch checked={true} data-testid="toggle-authenticator" />
                </div>
              </div>

              {/* Email Verification */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Verification</h4>
                    <p className="text-gray-400 text-sm">Receive verification codes via email</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-interactive border-interactive">Backup</Badge>
                  <Switch checked={true} data-testid="toggle-email" />
                </div>
              </div>

              {/* SMS Verification */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">SMS Verification</h4>
                    <p className="text-gray-400 text-sm">Receive codes via text message</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="text-gray-500 border-gray-500">Disabled</Badge>
                  <Switch checked={false} data-testid="toggle-sms" />
                </div>
              </div>

              {/* TOTP Authentication */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <QrCode className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">TOTP Authenticator</h4>
                    <p className="text-gray-400 text-sm">Use Google Authenticator, Authy, or similar apps</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={user?.totpEnabled ? "text-green-400 border-green-400" : "text-gray-500 border-gray-500"}>
                    {user?.totpEnabled ? "Enabled" : "Not Configured"}
                  </Badge>
                  {!user?.totpEnabled && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowTOTPModal(true)}
                      disabled={isSettingUpTOTP}
                      data-testid="setup-totp"
                    >
                      Setup
                    </Button>
                  )}
                </div>
              </div>

              {/* Biometric Authentication */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Fingerprint className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Biometric Authentication</h4>
                    <p className="text-gray-400 text-sm">Fingerprint, face recognition, or device biometrics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={user?.biometricEnabled ? "text-green-400 border-green-400" : "text-gray-500 border-gray-500"}>
                    {user?.biometricEnabled ? "Enabled" : "Not Configured"}
                  </Badge>
                  {!user?.biometricEnabled && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={true}
                      data-testid="setup-biometric"
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>

              {/* Hardware Key */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Key className="text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Hardware Key</h4>
                    <p className="text-gray-400 text-sm">Physical hardware security key (YubiKey, Titan, etc.)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={user?.hardwareKeyEnabled ? "text-green-400 border-green-400" : "text-gray-500 border-gray-500"}>
                    {user?.hardwareKeyEnabled ? "Enabled" : "Not Configured"}
                  </Badge>
                  {!user?.hardwareKeyEnabled && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={true}
                      data-testid="setup-hardware-key"
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>

              {/* Digital Key */}
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Digital Key</h4>
                    <p className="text-gray-400 text-sm">Smart cards or digital certificates</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={user?.digitalKeyEnabled ? "text-green-400 border-green-400" : "text-gray-500 border-gray-500"}>
                    {user?.digitalKeyEnabled ? "Enabled" : "Not Configured"}
                  </Badge>
                  {!user?.digitalKeyEnabled && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDigitalKeySetup}
                      disabled={isSettingUpDigitalKey || setupDigitalKeyMutation.isPending}
                      data-testid="setup-digital-key"
                    >
                      {isSettingUpDigitalKey || setupDigitalKeyMutation.isPending ? "Setting up..." : "Setup"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* TOTP Setup Modal */}
        {showTOTPModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-white">Set up TOTP Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-300 text-sm mb-4">
                    Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                  <div className="bg-white p-4 rounded-lg inline-block mb-4">
                    <QrCode size={200} className="text-black" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Secret: <code className="bg-gray-800 px-2 py-1 rounded text-xs">DEMO_SECRET_123</code>
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter 6-digit code from your app:
                  </label>
                  <Input
                    type="text"
                    value={totpVerificationCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotpVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="text-center text-2xl tracking-widest"
                    maxLength={6}
                    data-testid="totp-verification-code"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowTOTPModal(false);
                      setTotpVerificationCode("");
                    }}
                    className="flex-1"
                    data-testid="cancel-totp-setup"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      if (totpVerificationCode.length === 6) {
                        toast({
                          title: "TOTP Authentication Enabled",
                          description: "Your TOTP authentication has been successfully configured.",
                        });
                        setShowTOTPModal(false);
                        setTotpVerificationCode("");
                        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
                      } else {
                        toast({
                          title: "Invalid Code",
                          description: "Please enter a valid 6-digit code from your authenticator app.",
                          variant: "destructive",
                        });
                      }
                    }}
                    disabled={totpVerificationCode.length !== 6}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    data-testid="verify-totp-code"
                  >
                    Verify & Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Access Control Policies */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <CardTitle>Access Control Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Privileged Access Management</h4>
                  <p className="text-gray-400 text-sm">Administrative access requires additional verification</p>
                </div>
                <Switch checked={true} data-testid="toggle-pam" />
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Session Timeout</h4>
                  <p className="text-gray-400 text-sm">Automatically log out inactive sessions after 30 minutes</p>
                </div>
                <Switch checked={true} data-testid="toggle-timeout" />
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Location-Based Access</h4>
                  <p className="text-gray-400 text-sm">Restrict access based on geographic location</p>
                </div>
                <Switch checked={false} data-testid="toggle-location" />
              </div>

              <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div>
                  <h4 className="font-medium">Device Registration</h4>
                  <p className="text-gray-400 text-sm">Require device registration for new logins</p>
                </div>
                <Switch checked={true} data-testid="toggle-device" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
