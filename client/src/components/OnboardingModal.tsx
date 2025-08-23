import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Rocket, Lock, Users, Check, Eye, ArrowRight, ArrowLeft, Fingerprint, Smartphone, KeyRound, HelpCircle, QrCode, Copy, RefreshCw, Zap } from "lucide-react";
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
  const [showSecurityPolicy, setShowSecurityPolicy] = useState(false);
  const [showDataPolicy, setShowDataPolicy] = useState(false);
  const [securityPolicyAccepted, setSecurityPolicyAccepted] = useState(false);
  const [dataPolicyAccepted, setDataPolicyAccepted] = useState(false);
  const [isCompletingOnboarding, setIsCompletingOnboarding] = useState(false);
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

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

  const completeOnboarding = async (isQuickSetup = false) => {
    if (!user?.id) return;
    
    try {
      setIsCompletingOnboarding(true);
      
      // For quick setup, use default values
      const setupData = isQuickSetup ? {
        completed: true,
        securityPolicyAccepted: true,
        dataPolicyAccepted: true,
        mfaSetup: {
          enabled: true,
          method: "password-totp" // Default to Password + TOTP for quick setup
        }
      } : {
        completed: true,
        securityPolicyAccepted,
        dataPolicyAccepted,
        mfaSetup: {
          enabled: selectedMfaMethod !== "",
          method: selectedMfaMethod || "none"
        }
      };
      
      await apiRequest('PUT', `/api/users/${user.id}/onboarding`, setupData);
      
      if (isQuickSetup) {
        toast({
          title: "Quick Setup Complete!",
          description: "Your account is now secured with Password + TOTP authentication. You can customize settings later in your profile.",
          duration: 4000,
        });
      }
      
      onComplete();
      onClose();
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      toast({
        title: "Setup Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompletingOnboarding(false);
    }
  };

  const handleQuickSetup = async () => {
    await completeOnboarding(true);
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
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                <span>Need help?</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuickSetup}
                disabled={isCompletingOnboarding}
                className="flex items-center space-x-2 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
              >
                <Zap className="w-4 h-4" />
                <span>Quick Setup</span>
              </Button>
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
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="text-orange-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Multi-factor Authentication Setup</h2>
                  <p className="text-gray-300 text-sm">Strengthen your account security by enabling multi-factor authentication (MFA).</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 text-xs font-medium text-white bg-primary rounded-md">AI-Powered</span>
                <span className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md">Security</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Password + TOTP */}
              <Card className={`cursor-pointer border-2 transition-all hover:scale-105 ${
                selectedMfaMethod === "password-totp" 
                  ? 'border-blue-500 bg-blue-900/30' 
                  : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
              }`} onClick={() => setSelectedMfaMethod("password-totp")}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="text-blue-400 w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Password + TOTP</h3>
                  <p className="text-gray-300 text-sm mb-4">Use your password and a one-time code from an authenticator app.</p>
                  {selectedMfaMethod === "password-totp" && (
                    <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                  )}
                </CardContent>
              </Card>

              {/* Biometric + TOTP */}
              <Card className={`cursor-pointer border-2 transition-all hover:scale-105 relative ${
                selectedMfaMethod === "biometric-totp" 
                  ? 'border-purple-500 bg-purple-900/30' 
                  : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
              }`} onClick={() => setSelectedMfaMethod("biometric-totp")}>
                <CardContent className="p-6 text-center">
                  <div className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                    Enterprise Only
                  </div>
                  <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Fingerprint className="text-purple-400 w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Biometric + TOTP</h3>
                  <p className="text-gray-300 text-sm mb-4">Link your device's fingerprint or FaceID along with a one-time code.</p>
                  {selectedMfaMethod === "biometric-totp" && (
                    <div className="w-full h-2 bg-purple-500 rounded-full"></div>
                  )}
                </CardContent>
              </Card>

              {/* Digital Key */}
              <Card className={`cursor-pointer border-2 transition-all hover:scale-105 ${
                selectedMfaMethod === "digital-key" 
                  ? 'border-yellow-500 bg-yellow-900/30' 
                  : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
              }`} onClick={() => setSelectedMfaMethod("digital-key")}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="text-yellow-400 w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Digital Key</h3>
                  <p className="text-gray-300 text-sm mb-4">Authenticate using a physical security key (YubiKey, etc.).</p>
                  {selectedMfaMethod === "digital-key" && (
                    <div className="w-full h-2 bg-yellow-500 rounded-full"></div>
                  )}
                </CardContent>
              </Card>
            </div>

            {selectedMfaMethod && (
              <Card className="bg-green-900/20 border-green-700/50 mb-6">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="text-green-400 w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-300 mb-1">Why Multi-factor Authentication?</h4>
                      <p className="text-gray-300 text-sm">MFA provides an extra layer of protection by requiring multiple proofs of identity. Your account is shielded even if your primary credentials are compromised.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white text-3xl" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">Setup Complete!</h2>
            <p className="text-gray-300 mb-8">Your CyberSecure AI dashboard is ready for action</p>
            
            <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700/50 mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white text-sm">Security Policies</h3>
                    <p className="text-green-300 text-xs">Accepted & Active</p>
                  </div>
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white text-sm">MFA Protection</h3>
                    <p className="text-green-300 text-xs">{selectedMfaMethod ? "Configured" : "Available"}</p>
                  </div>
                  <div className="text-center">
                    <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white text-sm">Threat Monitoring</h3>
                    <p className="text-green-300 text-xs">Real-time Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2:
        return securityPolicyAccepted && dataPolicyAccepted;
      case 3:
        return selectedMfaMethod !== "";
      default:
        return true;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-foreground">Setup Wizard - Step {currentStep} of {steps.length}</DialogTitle>
            <div className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</div>
          </div>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress} className="w-full h-2" />
        </div>

        {/* Step Content */}
        <div className="py-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isCompletingOnboarding}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            
            {currentStep > 1 && currentStep < steps.length && (
              <Button
                variant="ghost"
                onClick={handleQuickSetup}
                disabled={isCompletingOnboarding}
                className="flex items-center space-x-2 text-primary hover:text-primary/80"
              >
                <Zap className="w-4 h-4" />
                <span>Quick Setup</span>
              </Button>
            )}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed() || isCompletingOnboarding}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === steps.length ? "Complete Setup" : "Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}