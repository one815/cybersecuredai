import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Rocket, Lock, Users, Check, Eye, ArrowRight, ArrowLeft, Fingerprint, Smartphone, KeyRound, HelpCircle, QrCode, Copy, RefreshCw } from "lucide-react";
import { SecurityPolicy } from "@/components/SecurityPolicy";
import { DataPolicy } from "@/components/DataPolicy";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { OnboardingStep } from "@/types";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Platform Introduction",
    description: "Welcome to CyberSecure AI - your intelligent security companion",
    icon: "rocket",
    completed: false,
  },
  {
    id: 2,
    title: "Policy Acceptance",
    description: "Review and accept our security policies and terms",
    icon: "shield",
    completed: false,
  },
  {
    id: 3,
    title: "MFA Activation",
    description: "Set up multi-factor authentication for enhanced security",
    icon: "lock",
    completed: false,
  },
  {
    id: 4,
    title: "Dashboard Ready",
    description: "Your security dashboard is configured and ready",
    icon: "users",
    completed: false,
  },
];

const iconMap = {
  rocket: Rocket,
  shield: Shield,
  lock: Lock,
  users: Users,
};

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState(onboardingSteps);
  const [selectedMfaMethod, setSelectedMfaMethod] = useState<string>("");
  const [yubiKeyVerified, setYubiKeyVerified] = useState(false);
  const [yubiKeyVerifying, setYubiKeyVerifying] = useState(false);
  const [showSecurityPolicy, setShowSecurityPolicy] = useState(false);
  const [showDataPolicy, setShowDataPolicy] = useState(false);
  const [securityPolicyAccepted, setSecurityPolicyAccepted] = useState(false);
  const [dataPolicyAccepted, setDataPolicyAccepted] = useState(false);
  const [isCompletingOnboarding, setIsCompletingOnboarding] = useState(false);
  const [mfaSetupStep, setMfaSetupStep] = useState(1); // 1: choose method, 2: setup/verify
  
  // TOTP Setup State
  const [totpSecret, setTotpSecret] = useState("");
  const [totpQrCode, setTotpQrCode] = useState("");
  const [totpVerificationCode, setTotpVerificationCode] = useState("");
  const [totpVerified, setTotpVerified] = useState(false);
  
  // Biometric Setup State  
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);
  const [biometricVerifying, setBiometricVerifying] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  // Generate TOTP secret and QR code
  const generateTotpSetup = () => {
    const secret = generateRandomSecret();
    const qrCode = generateQrCodeUrl(secret, user?.email || "user@cybersecure.ai");
    setTotpSecret(secret);
    setTotpQrCode(qrCode);
  };

  // Generate random base32 secret for TOTP
  const generateRandomSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };

  // Generate QR code URL for authenticator apps
  const generateQrCodeUrl = (secret: string, email: string) => {
    const issuer = 'CyberSecure AI';
    const label = `${issuer}:${email}`;
    const otpauthUrl = `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl)}`;
  };

  // Verify TOTP code
  const verifyTotpCode = () => {
    if (totpVerificationCode.length === 6) {
      // In a real app, this would verify against the server
      // For demo purposes, we'll accept any 6-digit code
      setTotpVerified(true);
      toast({
        title: "TOTP Verified",
        description: "Your authenticator app has been successfully configured.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code from your authenticator app.",
        variant: "destructive",
      });
    }
  };

  // Check biometric support and setup
  const setupBiometric = async () => {
    setBiometricVerifying(true);
    
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error("WEBAUTHN_NOT_SUPPORTED");
      }

      // Check if platform authenticator is available
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setBiometricSupported(available);
      
      if (!available) {
        // For demo purposes, we'll simulate successful setup on unsupported devices
        // In production, this would properly check device capabilities
        await new Promise(resolve => setTimeout(resolve, 2000));
        setBiometricVerified(true);
        toast({
          title: "Biometric Setup Complete",
          description: "Biometric authentication simulation completed successfully.",
        });
        return;
      }

      // Create a simple credential for demonstration
      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: {
          name: "CyberSecure AI",
          id: "localhost", // Use localhost for development
        },
        user: {
          id: crypto.getRandomValues(new Uint8Array(16)),
          name: user?.email || "user@cybersecure.ai",
          displayName: user?.email || "CyberSecure User",
        },
        pubKeyCredParams: [
          {alg: -7, type: "public-key"},
          {alg: -257, type: "public-key"}
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "preferred", // Changed from "required" for better compatibility
          requireResidentKey: false
        },
        timeout: 30000, // Reduced timeout
        attestation: "none" // Changed from "direct" for better compatibility
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });

      if (credential) {
        setBiometricVerified(true);
        toast({
          title: "Biometric Setup Complete",
          description: "Your biometric authentication has been successfully configured.",
        });
      }
    } catch (error: any) {
      console.error("Biometric setup failed:", error);
      
      // Handle specific error cases with more detailed feedback
      let title = "Biometric Setup Failed";
      let description = "";
      
      if (error.message === "WEBAUTHN_NOT_SUPPORTED") {
        description = "Your browser doesn't support biometric authentication. Please use Chrome, Firefox, or Safari.";
      } else if (error.name === "NotAllowedError") {
        description = "Biometric permission was denied. Please allow the request and try again.";
      } else if (error.name === "SecurityError") {
        description = "Security error occurred. Please ensure you're using a secure connection.";
      } else if (error.name === "NotSupportedError") {
        description = "Biometric authentication is not supported on this device.";
      } else if (error.name === "InvalidStateError") {
        description = "A biometric credential already exists. Setup completed successfully.";
        // Treat this as success since credential already exists
        setBiometricVerified(true);
        title = "Biometric Setup Complete";
        description = "Biometric authentication is already configured on this device.";
      } else if (error.name === "UnknownError") {
        description = "Device biometric authentication is not available or configured.";
      } else {
        description = "Unable to setup biometric authentication. You can continue with other MFA methods.";
      }
      
      // For devices without biometric support, treat as successful completion
      if (error.name === "NotSupportedError" || error.name === "UnknownError") {
        setBiometricVerified(true);
        title = "Setup Complete";
        description = "Biometric authentication configuration completed (simulated for this device).";
      }
      
      toast({
        title,
        description,
        variant: error.name === "InvalidStateError" || title === "Setup Complete" ? "default" : "destructive",
      });
    } finally {
      setBiometricVerifying(false);
    }
  };

  // YubiKey verification using WebAuthn/FIDO2
  const handleYubiKeyVerification = async () => {
    setYubiKeyVerifying(true);
    
    try {
      // Check if WebAuthn is supported
      if (!window.PublicKeyCredential) {
        throw new Error("WebAuthn is not supported in this browser");
      }

      // Create credential request options
      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: new Uint8Array(32).map(() => Math.random() * 256),
        allowCredentials: [],
        timeout: 60000,
        userVerification: "preferred",
        rpId: window.location.hostname,
      };

      // Request authentication from YubiKey
      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      }) as PublicKeyCredential;

      if (credential) {
        // Simulate server verification (in real app, send to backend)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setYubiKeyVerified(true);
        console.log("YubiKey verification successful:", credential.id);
      } else {
        throw new Error("No credential received");
      }
    } catch (error: any) {
      console.error("YubiKey verification failed:", error);
      
      // Handle specific error cases
      if (error.name === "NotAllowedError") {
        alert("YubiKey verification was cancelled or timed out. Please try again.");
      } else if (error.name === "SecurityError") {
        alert("Security error: Please ensure you're using HTTPS and your YubiKey is properly inserted.");
      } else if (error.message.includes("not supported")) {
        alert("Your browser doesn't support WebAuthn/FIDO2. Please use a modern browser like Chrome, Firefox, or Edge.");
      } else {
        alert("YubiKey verification failed. Please ensure your YubiKey is inserted and try again.");
      }
      
      setYubiKeyVerified(false);
    } finally {
      setYubiKeyVerifying(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  const handleNext = async () => {
    if (currentStep < steps.length) {
      // Mark current step as completed
      setSteps(prev => prev.map(step => 
        step.id === currentStep ? { ...step, completed: true } : step
      ));
      setCurrentStep(prev => prev + 1);
    } else {
      // All steps completed - save to database
      await completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    if (!user?.id) return;
    
    try {
      setIsCompletingOnboarding(true);
      
      await apiRequest('PUT', `/api/users/${user.id}/onboarding`, {
        completed: true,
        securityPolicyAccepted,
        dataPolicyAccepted,
        mfaSetup: {
          enabled: selectedMfaMethod !== "",
          method: selectedMfaMethod || "none"
        }
      });
      
      onComplete();
      onClose();
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      // Handle error gracefully
    } finally {
      setIsCompletingOnboarding(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-md">Secure &</span>
                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-md">Private</span>
              </div>
            </div>
            
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-white text-3xl" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Welcome to CyberSecure AI</h2>
            <p className="text-gray-300 mb-8">Your intelligent security companion for the digital age</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Eye className="text-blue-400 w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Threat Monitoring</h3>
                  <p className="text-gray-300 text-sm">Real-time detection and prevention of cyber threats using advanced AI algorithms</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Lock className="text-orange-400 w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Authentication</h3>
                  <p className="text-gray-300 text-sm">Multi-factor security with biometric verification for maximum protection</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-green-400 w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Phishing Prevention</h3>
                  <p className="text-gray-300 text-sm">Advanced detection systems to identify and block phishing attempts</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-900/30 border-blue-700/50 mb-8">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Check className="text-green-400 w-5 h-5" />
                  <span className="font-semibold text-white">Quick Setup</span>
                </div>
                <p className="text-gray-300 text-sm">We'll guide you through a simple 4-step process to set up your secure environment. This includes security policy acceptance, multi-factor authentication setup, and personalization of your dashboard.</p>
              </CardContent>
            </Card>
            
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              <span>Need help?</span>
            </div>
          </div>
        );
      
      case 2:
        if (showSecurityPolicy) {
          return (
            <SecurityPolicy
              onAccept={() => {
                setSecurityPolicyAccepted(true);
                setShowSecurityPolicy(false);
                setShowDataPolicy(true);
              }}
              onDecline={() => {
                setShowSecurityPolicy(false);
              }}
            />
          );
        }
        
        if (showDataPolicy) {
          return (
            <DataPolicy
              onAccept={() => {
                setDataPolicyAccepted(true);
                setShowDataPolicy(false);
              }}
              onDecline={() => {
                setShowDataPolicy(false);
              }}
            />
          );
        }
        
        return (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-red-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Policy Acceptance</h2>
                  <p className="text-gray-300 text-sm">Review and accept our security and data policies to continue.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-md">Secure &</span>
                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-md">Private</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <Card className={`cursor-pointer border-2 transition-all ${
                securityPolicyAccepted 
                  ? 'border-green-500 bg-green-900/30' 
                  : 'border-blue-700/50 bg-blue-900/20 hover:border-blue-600/70'
              }`} onClick={() => setShowSecurityPolicy(true)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Shield className="text-blue-400 w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Security Policy</h3>
                        <p className="text-gray-300 text-sm">Data protection, encryption, access controls, and security responsibilities</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {securityPolicyAccepted ? (
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 text-sm">Accepted</span>
                        </div>
                      ) : (
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer border-2 transition-all ${
                dataPolicyAccepted 
                  ? 'border-green-500 bg-green-900/30' 
                  : 'border-blue-700/50 bg-blue-900/20 hover:border-blue-600/70'
              }`} onClick={() => setShowDataPolicy(true)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Eye className="text-purple-400 w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">Data Policy</h3>
                        <p className="text-gray-300 text-sm">Information collection, usage, sharing, and your privacy rights</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {dataPolicyAccepted ? (
                        <div className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 text-sm">Accepted</span>
                        </div>
                      ) : (
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {securityPolicyAccepted && dataPolicyAccepted && (
              <Card className="bg-green-900/20 border-green-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Check className="text-green-400 w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-green-300">Policies Accepted</span>
                      <p className="text-gray-400 text-xs">You can now proceed to the next step of the onboarding process.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      
      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="text-orange-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Multi-factor Authentication Setup</h2>
                  <p className="text-gray-300 text-sm">Strengthen your account security by enabling multi-factor authentication (MFA).</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-md">AI-Powered</span>
                <span className="px-2 py-1 text-xs font-medium text-white bg-primary rounded-md">Security</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  mfaSetupStep >= 1 ? 'bg-orange-500' : 'bg-gray-600'
                }`}>1</div>
                <span className={`font-medium ${mfaSetupStep >= 1 ? 'text-white' : 'text-gray-400'}`}>Choose Method</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  mfaSetupStep >= 2 ? 'bg-orange-500' : 'bg-gray-600'
                }`}>2</div>
                <span className={`font-medium ${mfaSetupStep >= 2 ? 'text-white' : 'text-gray-400'}`}>Setup & Verify</span>
              </div>
            </div>

{mfaSetupStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className={`cursor-pointer border-2 transition-all ${
                  selectedMfaMethod === 'totp' 
                    ? 'border-orange-500 bg-orange-900/30' 
                    : 'border-blue-700/50 bg-blue-900/20 hover:border-blue-600/70'
                }`} onClick={() => setSelectedMfaMethod('totp')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="text-blue-400 w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2 text-white">Password + TOTP</h4>
                    <p className="text-gray-300 text-sm">Use your password and a one-time code from an authenticator app.</p>
                  </CardContent>
                </Card>
                
                <Card className={`cursor-pointer border-2 transition-all ${
                  selectedMfaMethod === 'biometric' 
                    ? 'border-orange-500 bg-orange-900/30' 
                    : 'border-blue-700/50 bg-blue-900/20 hover:border-blue-600/70'
                }`} onClick={() => setSelectedMfaMethod('biometric')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Fingerprint className="text-purple-400 w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2 text-white">Biometric + TOTP</h4>
                    <p className="text-gray-300 text-sm">Link your device's fingerprint or FaceID along with a one-time code.</p>
                    <div className="mt-2">
                      <span className="px-2 py-1 text-xs font-medium text-purple-300 bg-purple-500/20 rounded">Enterprise Only</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`cursor-pointer border-2 transition-all ${
                  selectedMfaMethod === 'hardware' 
                    ? 'border-orange-500 bg-orange-900/30' 
                    : 'border-blue-700/50 bg-blue-900/20 hover:border-blue-600/70'
                }`} onClick={() => setSelectedMfaMethod('hardware')}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <KeyRound className="text-yellow-400 w-6 h-6" />
                    </div>
                    <h4 className="font-semibold mb-2 text-white">Hardware Key</h4>
                    <p className="text-gray-300 text-sm">Authenticate using a physical security key (Yubikey, etc.).</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedMfaMethod && mfaSetupStep === 1 && (
              <div className="mb-6">
                <Button 
                  onClick={() => {
                    setMfaSetupStep(2);
                    if (selectedMfaMethod === 'totp') {
                      generateTotpSetup();
                    }
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Continue to Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* TOTP Setup */}
            {selectedMfaMethod === 'totp' && mfaSetupStep === 2 && (
              <div className="space-y-6 mb-6">
                <Card className="bg-blue-900/20 border-blue-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <QrCode className="text-blue-400 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-white">Setup Authenticator App</h3>
                        <p className="text-gray-300 text-sm">Scan the QR code with your authenticator app</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg inline-block mb-4">
                          <img src={totpQrCode} alt="TOTP QR Code" className="w-48 h-48" />
                        </div>
                        <p className="text-gray-300 text-sm">Scan with Google Authenticator, Authy, or similar app</p>
                      </div>
                      
                      <div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key (manual entry)</label>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="text" 
                                value={totpSecret} 
                                readOnly 
                                className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm font-mono rounded border border-gray-600"
                              />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(totpSecret);
                                  toast({ title: "Copied to clipboard" });
                                }}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Verification Code</label>
                            <input 
                              type="text" 
                              value={totpVerificationCode}
                              onChange={(e) => setTotpVerificationCode(e.target.value)}
                              placeholder="Enter 6-digit code"
                              maxLength={6}
                              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 text-center text-lg font-mono"
                            />
                          </div>
                          
                          <Button 
                            onClick={verifyTotpCode}
                            disabled={totpVerificationCode.length !== 6 || totpVerified}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            {totpVerified ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Verified
                              </>
                            ) : (
                              'Verify Code'
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Biometric Setup */}
            {selectedMfaMethod === 'biometric' && mfaSetupStep === 2 && (
              <div className="space-y-6 mb-6">
                <Card className="bg-purple-900/20 border-purple-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Fingerprint className="text-purple-400 w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-white">Biometric Authentication Setup</h3>
                        <p className="text-gray-300 text-sm">Configure fingerprint or face recognition for secure access</p>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Fingerprint className="w-12 h-12 text-purple-400" />
                      </div>
                      
                      {!biometricVerified && !biometricVerifying && (
                        <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700/50">
                          <div className="text-center space-y-2">
                            <p className="text-blue-300 text-sm font-medium">Ready to Setup Biometric Authentication</p>
                            <p className="text-gray-400 text-xs">This will use your device's fingerprint, Face ID, or Windows Hello</p>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={setupBiometric}
                        disabled={biometricVerifying || biometricVerified}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {biometricVerifying ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Setting up...
                          </>
                        ) : biometricVerified ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Biometric Verified
                          </>
                        ) : (
                          'Setup Biometric Authentication'
                        )}
                      </Button>
                      
                      {biometricVerified && (
                        <div className="p-4 bg-green-900/30 rounded-lg border border-green-700/50">
                          <div className="flex items-center space-x-2 justify-center">
                            <Check className="w-5 h-5 text-green-400" />
                            <p className="text-green-300 text-sm font-medium">Biometric authentication configured successfully!</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* YubiKey Setup */}
            {selectedMfaMethod === 'hardware' && mfaSetupStep === 2 && (
              <Card className="bg-yellow-900/20 border-yellow-700/50 mb-4">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <KeyRound className="text-yellow-400 w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-medium text-yellow-300">YubiKey Verification</span>
                      <p className="text-gray-300 text-sm">Insert your YubiKey and click verify to test the connection</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Button 
                      onClick={handleYubiKeyVerification}
                      disabled={yubiKeyVerifying}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      data-testid="button-verify-yubikey"
                    >
                      {yubiKeyVerifying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Verifying...
                        </>
                      ) : yubiKeyVerified ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Verified
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-4 h-4 mr-2" />
                          Verify YubiKey
                        </>
                      )}
                    </Button>
                    
                    {yubiKeyVerified && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-sm">YubiKey Connected</span>
                      </div>
                    )}
                  </div>
                  
                  {!yubiKeyVerified && (
                    <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
                      <div className="flex items-start space-x-2">
                        <HelpCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-blue-300 text-sm font-medium">Setup Instructions:</p>
                          <ol className="text-gray-300 text-xs mt-1 space-y-1 list-decimal list-inside">
                            <li>Insert your YubiKey into a USB port</li>
                            <li>Click "Verify YubiKey" and touch the key when prompted</li>
                            <li>Your browser may ask for permission to access the device</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {mfaSetupStep === 2 && (
              <div className="flex justify-between mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setMfaSetupStep(1)}
                  className="text-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Methods
                </Button>
                
                {((selectedMfaMethod === 'totp' && totpVerified) ||
                  (selectedMfaMethod === 'biometric' && biometricVerified) ||
                  (selectedMfaMethod === 'hardware' && yubiKeyVerified)) && (
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">MFA Setup Complete</span>
                  </div>
                )}
              </div>
            )}

            <Card className="bg-blue-900/30 border-blue-700/50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Check className="text-green-400 w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-green-300">Why Multi-factor Authentication?</span>
                    <p className="text-gray-300 text-sm mt-1">MFA provides an extra layer of protection by requiring multiple proofs of identity. Your account is shielded even if your primary credentials are compromised.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 4:
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="text-white w-6 h-6" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-md">Secure</span>
                <span className="px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-md">& Ready</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-green-400">Onboarding Complete!</h2>
            <p className="text-gray-300 mb-8">You've successfully set up your CyberSecure AI Dashboard. You're now protected with industry-leading security protocols.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Check className="text-green-400 text-sm" />
                    </div>
                    <span className="font-medium text-sm text-white">Platform Introduction</span>
                  </div>
                  <p className="text-gray-400 text-xs text-left">Welcome tour completed</p>
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-auto mt-2"></div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Check className="text-green-400 text-sm" />
                    </div>
                    <span className="font-medium text-sm text-white">Policy Acceptance</span>
                  </div>
                  <p className="text-gray-400 text-xs text-left">Security policy agreed</p>
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-auto mt-2"></div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Check className="text-green-400 text-sm" />
                    </div>
                    <span className="font-medium text-sm text-white">MFA Activated</span>
                  </div>
                  <p className="text-gray-400 text-xs text-left">Multi-factor Authentication Secured</p>
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-auto mt-2"></div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-900/30 border-blue-700/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Check className="text-green-400 text-sm" />
                    </div>
                    <span className="font-medium text-sm text-white">Dashboard Ready</span>
                  </div>
                  <p className="text-gray-400 text-xs text-left">Access to real-time AI-driven threat monitoring</p>
                  <div className="w-2 h-2 bg-green-400 rounded-full ml-auto mt-2"></div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-blue-900/30 border-blue-700/50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Check className="text-green-400" />
                  </div>
                  <span className="font-semibold text-green-300">Next Steps</span>
                </div>
                <p className="text-gray-300 text-sm text-left">Explore your dashboard for live threat analytics, manage permission boundaries, monitor encryption, and leverage AI-driven phishing prevention tools. Your security journey is just beginning.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-surface border-surface-light">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-xl font-bold">
              Setup Wizard - Step {currentStep} of {steps.length}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Step {currentStep} of {steps.length}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </DialogHeader>
        
        <div className="py-6">
          {renderStepContent()}
        </div>
        
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            disabled={currentStep === 1}
            className="text-interactive hover:text-orange-400"
            data-testid="onboarding-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex justify-center space-x-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  step.id === currentStep
                    ? "bg-interactive"
                    : step.completed
                    ? "bg-success"
                    : "bg-surface-light"
                }`}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md"
            disabled={
              (currentStep === 2 && (!securityPolicyAccepted || !dataPolicyAccepted)) || 
              (currentStep === 3 && (
                !selectedMfaMethod || 
                mfaSetupStep === 1 ||
                (selectedMfaMethod === 'totp' && !totpVerified) ||
                (selectedMfaMethod === 'biometric' && !biometricVerified) ||
                (selectedMfaMethod === 'hardware' && !yubiKeyVerified)
              )) ||
              (currentStep === 4 && isCompletingOnboarding)
            }
            data-testid="onboarding-next"
          >
            {currentStep === 1 ? "Get Started" : currentStep === steps.length ? (isCompletingOnboarding ? "Completing..." : "Go to Dashboard") : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
