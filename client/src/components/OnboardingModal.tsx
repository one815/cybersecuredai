import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Rocket, Lock, Users, Check, Eye, ArrowRight, ArrowLeft, Fingerprint, Smartphone, KeyRound, HelpCircle } from "lucide-react";
import { SecurityPolicy } from "@/components/SecurityPolicy";
import { DataPolicy } from "@/components/DataPolicy";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
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
  const { user } = useAuth();

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
      
      await apiRequest(`/api/users/${user.id}/onboarding`, {
        method: 'PUT',
        body: {
          completed: true,
          securityPolicyAccepted,
          dataPolicyAccepted,
          mfaSetup: {
            enabled: selectedMfaMethod !== "",
            method: selectedMfaMethod || "none"
          }
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
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <span className="font-medium text-white">Choose Method</span>
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <span className="text-gray-400">Verify Setup</span>
              </div>
            </div>

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

            {/* YubiKey Verification Section */}
            {selectedMfaMethod === 'hardware' && (
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
              (currentStep === 3 && (!selectedMfaMethod || (selectedMfaMethod === 'hardware' && !yubiKeyVerified))) ||
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
