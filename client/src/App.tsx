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

// Platform/Dashboard Pages
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

// Marketing Website Pages
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Solutions from "@/pages/Solutions";
import Pricing from "@/pages/Pricing";
import SecurityScanner from "@/pages/SecurityScanner";
import Careers from "@/pages/Careers";
import Blogs from "@/pages/Blogs";
import News from "@/pages/News";
import { ClientLogin } from "@/pages/ClientLogin";
import SecurityPlaybookSimulator from "@/pages/SecurityPlaybookSimulator";

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
    <Switch>
      {/* Marketing Website Routes (no Layout wrapper) */}
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/security-scanner" component={SecurityScanner} />
      <Route path="/careers" component={Careers} />
      <Route path="/blog" component={Blogs} />
      <Route path="/news" component={News} />
      <Route path="/client-login" component={ClientLogin} />
      <Route path="/security-playbook-simulator" component={SecurityPlaybookSimulator} />
      
      {/* Platform/Dashboard Routes (with Layout wrapper) */}
      <Route path="/dashboard">
        <Layout>
          <Dashboard />
          <OnboardingModal 
            isOpen={showOnboarding}
            onClose={() => setShowOnboarding(false)}
            onComplete={handleOnboardingComplete}
          />
        </Layout>
      </Route>
      <Route path="/threats">
        <Layout>
          <ThreatMonitoring />
        </Layout>
      </Route>
      <Route path="/threat-analysis">
        <Layout>
          <ThreatAnalysis />
        </Layout>
      </Route>
      <Route path="/security-integrations">
        <Layout>
          <SecurityIntegrations />
        </Layout>
      </Route>
      <Route path="/it-management">
        <Layout>
          <ITManagement />
        </Layout>
      </Route>
      <Route path="/training">
        <Layout>
          <SecurityTraining />
        </Layout>
      </Route>
      <Route path="/support">
        <Layout>
          <HelpDesk />
        </Layout>
      </Route>
      <Route path="/authentication">
        <Layout>
          <Authentication />
        </Layout>
      </Route>
      <Route path="/files">
        <Layout>
          <FileSharing />
        </Layout>
      </Route>
      <Route path="/compliance">
        <Layout>
          <Compliance />
        </Layout>
      </Route>
      <Route path="/users">
        <Layout>
          <UserManagement />
        </Layout>
      </Route>
      <Route path="/reports">
        <Layout>
          <Reports />
        </Layout>
      </Route>
      <Route path="/incidents">
        <Layout>
          <IncidentResponse />
        </Layout>
      </Route>
      <Route path="/admin">
        <Layout>
          <AdminPanel />
        </Layout>
      </Route>
      <Route path="/ai-config">
        <Layout>
          <AIConfiguration />
        </Layout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
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
