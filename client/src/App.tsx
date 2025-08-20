import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { OnboardingModal } from "@/components/OnboardingModal";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import ThreatMonitoring from "@/pages/ThreatMonitoring";
import ThreatAnalysis from "@/pages/ThreatAnalysis";
import Authentication from "@/pages/Authentication";
import FileSharing from "@/pages/FileSharing";
import Compliance from "@/pages/Compliance";
import UserManagement from "@/pages/UserManagement";
import Reports from "@/pages/Reports";
import IncidentResponse from "@/pages/IncidentResponse";
import AdminPanel from "@/pages/AdminPanel";
import AIConfiguration from "@/pages/AIConfiguration";
import SecurityIntegrations from "@/pages/SecurityIntegrations";
import ITManagement from "@/pages/ITManagement";
import SecurityTraining from "@/pages/SecurityTraining";
import HelpDesk from "@/pages/HelpDesk";

function Router() {
  const { user, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Show onboarding if user exists but hasn't completed onboarding
    if (user && !user.onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // In a real app, this would update the user's onboarding status via API
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-interactive"></div>
      </div>
    );
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/threats" component={ThreatMonitoring} />
        <Route path="/threat-analysis" component={ThreatAnalysis} />
        <Route path="/security-integrations" component={SecurityIntegrations} />
        <Route path="/it-management" component={ITManagement} />
        <Route path="/training" component={SecurityTraining} />
        <Route path="/support" component={HelpDesk} />
        <Route path="/authentication" component={Authentication} />
        <Route path="/files" component={FileSharing} />
        <Route path="/compliance" component={Compliance} />
        <Route path="/users" component={UserManagement} />
        <Route path="/reports" component={Reports} />
        <Route path="/incidents" component={IncidentResponse} />
        <Route path="/admin" component={AdminPanel} />
        <Route path="/ai-config" component={AIConfiguration} />
        <Route component={NotFound} />
      </Switch>
      
      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
