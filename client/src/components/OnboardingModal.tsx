import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Rocket, Lock, Users, Check, Eye, ArrowRight, ArrowLeft } from "lucide-react";
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

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      // Mark current step as completed
      setSteps(prev => prev.map(step => 
        step.id === currentStep ? { ...step, completed: true } : step
      ));
      setCurrentStep(prev => prev + 1);
    } else {
      // All steps completed
      onComplete();
      onClose();
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
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Shield className="text-secondary text-3xl" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Welcome to CyberSecure AI</h2>
            <p className="text-gray-400 mb-8">Your intelligent security companion for the digital age</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-background/50">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Eye className="text-secondary" />
                  </div>
                  <h3 className="font-medium mb-2">Threat Monitoring</h3>
                  <p className="text-gray-400 text-sm">Real-time detection and prevention of cyber threats using advanced AI algorithms</p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Lock className="text-interactive" />
                  </div>
                  <h3 className="font-medium mb-2">Authentication</h3>
                  <p className="text-gray-400 text-sm">Multi-factor security with biometric verification for maximum protection</p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="text-success" />
                  </div>
                  <h3 className="font-medium mb-2">Phishing Prevention</h3>
                  <p className="text-gray-400 text-sm">Advanced detection systems to identify and block phishing attempts</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-background/50 mb-8">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Rocket className="text-interactive" />
                  <span className="font-medium">Quick Setup</span>
                </div>
                <p className="text-gray-400 text-sm">We'll guide you through a simple 4-step process to set up your secure environment. This includes security policy acceptance, multi-factor authentication setup, and personalization of your dashboard.</p>
              </CardContent>
            </Card>
          </div>
        );
      
      case 2:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-secondary text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Security Policy Acceptance</h2>
            <p className="text-gray-400 mb-8">Please review and accept our security policies to continue</p>
            
            <div className="text-left space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Check className="text-success mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Data Protection Policy</h4>
                  <p className="text-gray-400 text-sm">Your data is encrypted and protected according to industry standards</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-success mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Access Control Guidelines</h4>
                  <p className="text-gray-400 text-sm">Role-based access ensures proper security boundaries</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-success mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Incident Response Protocol</h4>
                  <p className="text-gray-400 text-sm">Automated response procedures for security incidents</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-interactive rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Multi-Factor Authentication</h2>
            <p className="text-gray-400 mb-8">Secure your account with an additional layer of protection</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-background/50 cursor-pointer hover:bg-background/70 transition-colors">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-mobile-alt text-interactive"></i>
                  </div>
                  <h4 className="font-medium mb-2">Authenticator App</h4>
                  <p className="text-gray-400 text-sm">Use Google Authenticator or similar apps for time-based codes</p>
                </CardContent>
              </Card>
              
              <Card className="bg-background/50 cursor-pointer hover:bg-background/70 transition-colors">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-envelope text-interactive"></i>
                  </div>
                  <h4 className="font-medium mb-2">Email Verification</h4>
                  <p className="text-gray-400 text-sm">Receive verification codes via email</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-success">Onboarding Complete!</h2>
            <p className="text-gray-400 mb-8">You've successfully set up your CyberSecure AI Dashboard. You're now protected with industry-leading security protocols.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Check className="text-success text-sm" />
                  </div>
                  <span className="font-medium text-sm">Platform Introduction</span>
                </div>
                <p className="text-gray-400 text-xs">Welcome tour completed</p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Check className="text-success text-sm" />
                  </div>
                  <span className="font-medium text-sm">Policy Acceptance</span>
                </div>
                <p className="text-gray-400 text-xs">Security policy agreed</p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Check className="text-success text-sm" />
                  </div>
                  <span className="font-medium text-sm">MFA Activated</span>
                </div>
                <p className="text-gray-400 text-xs">Multi-factor Authentication Secured</p>
              </div>
              
              <div className="bg-background/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Check className="text-success text-sm" />
                  </div>
                  <span className="font-medium text-sm">Dashboard Ready</span>
                </div>
                <p className="text-gray-400 text-xs">Access to real-time AI-driven threat monitoring</p>
              </div>
            </div>

            <Card className="bg-background/50 mb-8">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                    <Check className="text-success" />
                  </div>
                  <span className="font-medium">Next Steps</span>
                </div>
                <p className="text-gray-400 text-sm">Explore your dashboard for live threat analytics, manage permission boundaries, monitor encryption, and leverage AI-driven phishing prevention tools. Your security journey is just beginning.</p>
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
            className="bg-interactive hover:bg-orange-600 text-white"
            data-testid="onboarding-next"
          >
            {currentStep === steps.length ? "Go to Dashboard" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
