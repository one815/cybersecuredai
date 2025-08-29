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
import { Loader2, Mail, Download } from "lucide-react";

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
  const [subscribeToEmails, setSubscribeToEmails] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const subscribeMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; subscribedToEmails: boolean; resourceId: string }) => {
      return apiRequest("/api/subscribers", "POST", data);
    },
    onSuccess: async () => {
      // Trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = resourceTitle;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Success!",
        description: `${resourceTitle} is being downloaded. Check your downloads folder.`,
      });

      // Send email with resource
      await apiRequest("/api/send-resource-email", "POST", {
        email,
        name,
        resourceTitle,
        resourceId
      });

      onClose();
      setName("");
      setEmail("");
      setSubscribeToEmails(true);
      
      queryClient.invalidateQueries({ queryKey: ["/api/subscribers"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Required Fields",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    subscribeMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      subscribedToEmails: subscribeToEmails,
      resourceId
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-cyan-400">
            <Download className="w-5 h-5" />
            Download {resourceTitle}
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            Please provide your contact information to download this resource. 
            We'll also send a copy to your email.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              data-testid="input-subscriber-name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              data-testid="input-subscriber-email"
              required
            />
          </div>

          <div className="flex items-center space-x-2 p-3 bg-slate-800/50 rounded-md border border-slate-600">
            <Checkbox
              id="subscribe"
              checked={subscribeToEmails}
              onCheckedChange={(checked) => setSubscribeToEmails(!!checked)}
              className="border-slate-500"
              data-testid="checkbox-subscribe-emails"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="subscribe" 
                className="text-sm text-slate-200 cursor-pointer"
              >
                Subscribe to CyberSecure AI Updates
              </Label>
              <p className="text-xs text-slate-400">
                Get the latest cybersecurity insights, reports, and product updates delivered to your inbox.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
              data-testid="button-cancel-download"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white"
              data-testid="button-download-resource"
            >
              {subscribeMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Download Resource
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}