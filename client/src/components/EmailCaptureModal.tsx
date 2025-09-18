import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, Mail, Download, Lock, CheckCircle } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  resourceId: string;
  downloadUrl: string;
}

export function EmailCaptureModal({
  isOpen,
  onClose,
  resourceTitle,
  resourceId,
  downloadUrl
}: EmailCaptureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [subscribeToEmails, setSubscribeToEmails] = useState(true);
  const [step, setStep] = useState<'email' | 'code'>('email');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateCodeMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; resourceTitle: string; resourceId: string; downloadUrl: string }) => {
      return apiRequest("/api/generate-confirmation-code", { method: "POST", data: data });
    },
    onSuccess: (response: any) => {
      setStep('code');
      if (response.code) {
        // Show code in toast for demo purposes when email service isn't configured
        toast({
          title: "Confirmation Code Generated!",
          description: `Your code is: ${response.code} (normally sent via email)`,
        });
      } else {
        toast({
          title: "Code Sent!",
          description: "Please check your email for the confirmation code.",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send confirmation code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async (data: { email: string; code: string }) => {
      return apiRequest("/api/verify-confirmation-code", { method: "POST", data: data });
    },
    onSuccess: async (response: any) => {
      // Trigger download
      const link = document.createElement('a');
      link.href = response.downloadUrl;
      link.download = response.resourceTitle;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started!",
        description: `${response.resourceTitle} is being downloaded. Check your downloads folder.`,
      });

      // Create subscriber record
      await apiRequest("/api/subscribers", { method: "POST", data: {
        name,
        email,
        subscribedToEmails: subscribeToEmails,
        resourceId
      } });

      handleClose();
      queryClient.invalidateQueries({ queryKey: ["/api/subscribers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Invalid Code",
        description: error.message || "Invalid or expired confirmation code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleClose = () => {
    onClose();
    setStep('email');
    setName("");
    setEmail("");
    setConfirmationCode("");
    setSubscribeToEmails(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    generateCodeMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      resourceTitle,
      resourceId,
      downloadUrl
    });
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirmationCode.trim() || confirmationCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit confirmation code.",
        variant: "destructive",
      });
      return;
    }

    verifyCodeMutation.mutate({
      email,
      code: confirmationCode.trim()
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="ai-dialog max-w-md">
        {step === 'email' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <Download className="w-5 h-5 text-spring-400" />
                Download Resource
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Enter your details to download <span className="font-semibold text-spring-400">{resourceTitle}</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ai-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ai-input"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribe"
                  checked={subscribeToEmails}
                  onCheckedChange={(checked) => setSubscribeToEmails(checked === true)}
                  className="data-[state=checked]:bg-spring-500 data-[state=checked]:border-spring-500"
                />
                <Label 
                  htmlFor="subscribe" 
                  className="text-sm text-gray-300 cursor-pointer"
                >
                  Subscribe to our cybersecurity newsletter
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={generateCodeMutation.isPending}
                  className="flex-1 bg-spring-500 hover:bg-spring-600 text-black font-semibold"
                >
                  {generateCodeMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Confirmation Code
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <Lock className="w-5 h-5 text-spring-400" />
                Enter Confirmation Code
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                We've sent a 6-digit code to <span className="font-semibold text-spring-400">{email}</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-white">Confirmation Code *</Label>
                <Input
                  id="code"
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="ai-input text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-400">Check your email for the 6-digit confirmation code</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep('email')}
                  className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={verifyCodeMutation.isPending || confirmationCode.length !== 6}
                  className="flex-1 bg-spring-500 hover:bg-spring-600 text-black font-semibold"
                >
                  {verifyCodeMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify & Download
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}