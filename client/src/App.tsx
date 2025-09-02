import { Switch, Route, useLocation } from "wouter";
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
import ThreatDetection from "@/pages/ThreatDetection";
import Authentication from "@/pages/Authentication";
import FileSharing from "@/pages/FileSharing";
import Compliance from "@/pages/Compliance";
import Achievements from "@/pages/Achievements";
import UserManagement from "@/pages/UserManagement";
import Reports from "@/pages/Reports";
import IncidentResponse from "@/pages/IncidentResponse";
import AdminPanel from "@/pages/AdminPanel";
import AIConfiguration from "@/pages/AIConfiguration";
import SecurityIntegrations from "@/pages/SecurityIntegrations";
import ITManagement from "@/pages/ITManagement";
import SecurityTraining from "@/pages/SecurityTraining";
import HelpDesk from "@/pages/HelpDesk";
import Resources from "@/pages/Resources";
import Courses from "@/pages/Courses";
import BlogPosts from "@/pages/BlogPosts";
import Handbooks from "@/pages/Handbooks";
import Webinars from "@/pages/Webinars";
import WhitePapers from "@/pages/WhitePapers";
import Podcasts from "@/pages/Podcasts";
import SuccessKits from "@/pages/SuccessKits";
import Videos from "@/pages/Videos";
import UseCases from "@/pages/UseCases";
import EBooks from "@/pages/EBooks";
import DataSheets from "@/pages/DataSheets";
import ClientStories from "@/pages/ClientStories";
import Demos from "@/pages/Demos";
import Integrations from "@/pages/Integrations";
import MarketingReports from "@/pages/MarketingReports";
import SecurityOverview from "@/pages/SecurityOverview";
import SecurityDashboard from "@/pages/SecurityDashboard";
import ThreatIntelligenceDashboard from "@/pages/ThreatIntelligenceDashboard";
import MISPLiveDashboard from "@/pages/MISPLiveDashboard";
import MISPBenefits from "@/pages/MISPBenefits";
import VulnerabilityTrendDashboard from "@/pages/VulnerabilityTrendDashboard";
import ThreatMap5D from "@/pages/ThreatMap5D";

// Marketing Website Pages
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Leadership from "@/pages/Leadership";
import Awards from "@/pages/Awards";
import Contact from "@/pages/Contact";
import Solutions from "@/pages/Solutions";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import SecurityScanner from "@/pages/SecurityScanner";
import BasicSecurityScan from "@/pages/BasicSecurityScan";
import Careers from "@/pages/Careers";
import Blogs from "@/pages/Blogs";
import News from "@/pages/News";
import { ClientLogin } from "@/pages/ClientLogin";
import ThreatReport2025 from "@/pages/ThreatReport2025";
import SecurityPlaybookSimulator from "@/pages/SecurityPlaybookSimulator";

// Marketing Document Viewers
import DocumentViewer from "@/pages/marketing/DocumentViewer";
import ArticleViewer from "@/pages/marketing/ArticleViewer";
import CourseViewer from "@/pages/marketing/CourseViewer";
import WhyCyberSecuredAI from "@/pages/WhyCyberSecureAI";
import FuturisticDemo from "@/pages/FuturisticDemo";

// Solutions Pages
import RansomwareProtection from "@/pages/solutions/RansomwareProtection";
import ZeroTrustSecurity from "@/pages/solutions/ZeroTrustSecurity";
import CloudSecurity from "@/pages/solutions/CloudSecurity";
import AIThreatDetection from "@/pages/solutions/AIThreatDetection";
import K12Education from "@/pages/solutions/K12Education";
import HigherEducation from "@/pages/solutions/HigherEducation";
import MunicipalGovernment from "@/pages/solutions/MunicipalGovernment";
import FederalAgencies from "@/pages/solutions/FederalAgencies";

// Platform Pages
import Platform from "@/pages/Platform";
import AutomatedIncidentResponse from "@/pages/platform/AutomatedIncidentResponse";
import PlatformThreatDetection from "@/pages/platform/ThreatDetection";
import PredictiveRiskAnalysis from "@/pages/platform/PredictiveRiskAnalysis";
import ComplianceAutomation from "@/pages/platform/ComplianceAutomation";
import PlatformSecurityTraining from "@/pages/platform/SecurityTraining";
import MonitoringVulnerability from "@/pages/platform/MonitoringVulnerability";
import FirewallManagement from "@/pages/platform/FirewallManagement";
import NetworkMonitoring from "@/pages/platform/NetworkMonitoring";
import ZeroTrustArchitecture from "@/pages/platform/ZeroTrustArchitecture";
import IdentityAccessManagement from "@/pages/platform/IdentityAccessManagement";
import SystemAdministration from "@/pages/platform/SystemAdministration";
import HardwareSecurityModules from "@/pages/platform/HardwareSecurityModules";
import BiometricAuthentication from "@/pages/platform/BiometricAuthentication";
import EnhancedThreatIntelligence from "@/pages/platform/EnhancedThreatIntelligence";
import SecurityInfrastructureMonitoring from "@/pages/platform/SecurityInfrastructureMonitoring";
import EnterpriseIAM from "@/pages/platform/EnterpriseIAM";
import MLAnalytics from "@/pages/platform/MLAnalytics";
import IBMXForceIntelligence from "@/pages/platform/IBMXForceIntelligence";
import AlternativeThreatFeeds from "@/pages/platform/AlternativeThreatFeeds";
import EnterpriseSecurity from "@/pages/EnterpriseSecurity";

// Resource Pages
import DataSheetFederalZeroTrust from "@/pages/resources/DataSheetFederalZeroTrust";
import DataSheetCriticalInfrastructure from "@/pages/resources/DataSheetCriticalInfrastructure";
import DataSheetRapidResponse from "@/pages/resources/DataSheetRapidResponse";
import DataSheetUniversityResearch from "@/pages/resources/DataSheetUniversityResearch";

// Client Story Pages
import FederalEducationSecurity from "@/pages/client-stories/FederalEducationSecurity";
import UniversityFerpaCompliance from "@/pages/client-stories/UniversityFerpaCompliance";
import K12CostSavings from "@/pages/client-stories/K12CostSavings";

function Router() {
  const { user, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    // Only show onboarding on platform pages (not marketing pages)
    const isPlatformPage = location.startsWith('/dashboard') || 
                          location.startsWith('/threats') || 
                          location.startsWith('/auth') ||
                          location.startsWith('/files') ||
                          location.startsWith('/compliance') ||
                          location.startsWith('/users') ||
                          location.startsWith('/admin') ||
                          location.startsWith('/security') ||
                          location.startsWith('/vulnerability') ||
                          location.startsWith('/incidents') ||
                          location.startsWith('/reports') ||
                          location.startsWith('/training') ||
                          location.startsWith('/threat-') ||
                          location.startsWith('/ai-config') ||
                          location.startsWith('/support');

    // Show onboarding if user exists, is on a platform page, and lacks proper auth setup
    if (user && isPlatformPage && !isLoading) {
      const needsAuthSetup = !user.onboardingCompleted || 
                           (!user.mfaEnabled && !user.digitalKeyEnabled) ||
                           !user.securityPolicyAccepted;
      setShowOnboarding(needsAuthSetup);
    } else {
      setShowOnboarding(false);
    }
  }, [user, isLoading, location]);


  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Refresh user data to get updated onboarding status
    window.location.reload();
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-interactive"></div>
      </div>
    );
  }

  return (
    <>
      <Switch>
        {/* Marketing Website Routes (no Layout wrapper) */}
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/about/leadership" component={Leadership} />
      <Route path="/about/awards" component={Awards} />
      <Route path="/contact" component={Contact} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/careers" component={Careers} />
      <Route path="/blog" component={Blogs} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/video-topics" component={Videos} />
      <Route path="/threat-report-2025" component={ThreatReport2025} />
      <Route path="/news" component={News} />
      <Route path="/client-login" component={ClientLogin} />
      <Route path="/security-playbook-simulator" component={SecurityPlaybookSimulator} />
      <Route path="/why-cybersecured-ai" component={WhyCyberSecuredAI} />
      <Route path="/futuristic-demo" component={FuturisticDemo} />
      <Route path="/misp-benefits" component={MISPBenefits} />
      <Route path="/demos/biometric-authentication" component={FuturisticDemo} />
      <Route path="/platform-demo" component={Demos} />
      <Route path="/platform-tour" component={Demos} />
      <Route path="/trials" component={Pricing} />
      <Route path="/security-scanner" component={BasicSecurityScan} />
      
      {/* Solutions Pages */}
      <Route path="/solutions/ransomware" component={RansomwareProtection} />
      <Route path="/solutions/zero-trust" component={ZeroTrustSecurity} />
      <Route path="/solutions/cloud" component={CloudSecurity} />
      <Route path="/solutions/ai-threat-detection" component={AIThreatDetection} />
      <Route path="/solutions/k12" component={K12Education} />
      <Route path="/solutions/higher-ed" component={HigherEducation} />
      <Route path="/solutions/municipal" component={MunicipalGovernment} />
      <Route path="/solutions/federal" component={FederalAgencies} />
      
      {/* Platform Pages */}
      <Route path="/platform" component={Platform} />
      <Route path="/platform/automated-incident-response" component={AutomatedIncidentResponse} />
      <Route path="/platform/threat-detection" component={PlatformThreatDetection} />
      <Route path="/platform/predictive-risk-analysis" component={PredictiveRiskAnalysis} />
      <Route path="/platform/compliance-automation" component={ComplianceAutomation} />
      <Route path="/platform/security-training" component={PlatformSecurityTraining} />
      <Route path="/platform/firewall-management" component={FirewallManagement} />
      <Route path="/platform/network-monitoring" component={NetworkMonitoring} />
      <Route path="/platform/zero-trust" component={ZeroTrustArchitecture} />
      <Route path="/platform/iam" component={IdentityAccessManagement} />
      <Route path="/platform/system-administration" component={SystemAdministration} />
      <Route path="/platform/monitoring-vulnerability">
        <Layout>
          <MonitoringVulnerability />
        </Layout>
      </Route>
      
      {/* Platform/Dashboard Routes (with Layout wrapper) */}
      <Route path="/dashboard">
        <Layout showOnboarding={showOnboarding} onCloseOnboarding={() => setShowOnboarding(false)} onCompleteOnboarding={handleOnboardingComplete}>
          <Dashboard />
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
      <Route path="/security-overview">
        <Layout>
          <SecurityOverview />
        </Layout>
      </Route>
      <Route path="/security-dashboard">
        <Layout>
          <SecurityDashboard />
        </Layout>
      </Route>
      <Route path="/threat-intelligence">
        <Layout>
          <ThreatIntelligenceDashboard />
        </Layout>
      </Route>
      <Route path="/misp-live">
        <Layout>
          <MISPLiveDashboard />
        </Layout>
      </Route>
      <Route path="/vulnerability-trends">
        <Layout>
          <VulnerabilityTrendDashboard />
        </Layout>
      </Route>
      <Route path="/threat-map-5d">
        <Layout>
          <ThreatMap5D />
        </Layout>
      </Route>
      <Route path="/security-integrations">
        <Layout>
          <SecurityIntegrations />
        </Layout>
      </Route>
      <Route path="/enterprise-security">
        <Layout>
          <EnterpriseSecurity />
        </Layout>
      </Route>
      <Route path="/it-management">
        <Layout>
          <ITManagement />
        </Layout>
      </Route>
      <Route path="/platform/hardware-security-modules">
        <Layout>
          <HardwareSecurityModules />
        </Layout>
      </Route>
      <Route path="/platform/biometric-authentication">
        <Layout>
          <BiometricAuthentication />
        </Layout>
      </Route>
      <Route path="/platform/enhanced-threat-intelligence">
        <Layout>
          <EnhancedThreatIntelligence />
        </Layout>
      </Route>
      <Route path="/platform/security-infrastructure-monitoring">
        <Layout>
          <SecurityInfrastructureMonitoring />
        </Layout>
      </Route>
      <Route path="/platform/enterprise-iam">
        <Layout>
          <EnterpriseIAM />
        </Layout>
      </Route>
      <Route path="/platform/ml-analytics">
        <Layout>
          <MLAnalytics />
        </Layout>
      </Route>
      <Route path="/platform/ibm-xforce-intelligence">
        <Layout>
          <IBMXForceIntelligence />
        </Layout>
      </Route>
      <Route path="/platform/alternative-threat-feeds">
        <Layout>
          <AlternativeThreatFeeds />
        </Layout>
      </Route>
      <Route path="/training">
        <Layout>
          <SecurityTraining />
        </Layout>
      </Route>
      {/* Marketing Resource Pages - No Layout wrapper, accessible to all */}
      <Route path="/resources" component={Resources} />
      <Route path="/resources/ebooks" component={EBooks} />
      <Route path="/resources/datasheets" component={DataSheets} />
      <Route path="/resources/use-cases" component={UseCases} />
      <Route path="/resources/whitepapers" component={WhitePapers} />
      <Route path="/resources/white-papers" component={WhitePapers} />
      <Route path="/resources/handbooks" component={Handbooks} />
      <Route path="/podcasts" component={Podcasts} />
      <Route path="/success-kits" component={SuccessKits} />
      <Route path="/videos" component={Videos} />
      <Route path="/resources/webinars" component={Webinars} />
      <Route path="/resources/client-stories" component={ClientStories} />
      <Route path="/resources/demos" component={Demos} />
      <Route path="/resources/integrations" component={Integrations} />
      <Route path="/resources/reports" component={MarketingReports} />
      <Route path="/resources/courses" component={Courses} />
      <Route path="/courses" component={Courses} />
      <Route path="/use-cases" component={UseCases} />
      <Route path="/ebooks" component={EBooks} />
      <Route path="/datasheets" component={DataSheets} />
      <Route path="/handbooks" component={Handbooks} />
      <Route path="/webinars" component={Webinars} />
      <Route path="/whitepapers" component={WhitePapers} />
      <Route path="/white-papers" component={WhitePapers} />
      <Route path="/client-stories" component={ClientStories} />
      <Route path="/demos" component={Demos} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/blog-posts">
        <Layout>
          <BlogPosts />
        </Layout>
      </Route>
      <Route path="/handbooks">
        <Layout>
          <Handbooks />
        </Layout>
      </Route>
      <Route path="/webinars">
        <Layout>
          <Webinars />
        </Layout>
      </Route>
      <Route path="/whitepapers">
        <Layout>
          <WhitePapers />
        </Layout>
      </Route>
      <Route path="/use-cases">
        <Layout>
          <UseCases />
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
      <Route path="/file-sharing">
        <Layout>
          <FileSharing />
        </Layout>
      </Route>
      <Route path="/compliance">
        <Layout>
          <Compliance />
        </Layout>
      </Route>
      <Route path="/achievements">
        <Layout>
          <Achievements />
        </Layout>
      </Route>
      <Route path="/users">
        <Layout>
          <UserManagement />
        </Layout>
      </Route>
      <Route path="/user-management">
        <Layout>
          <UserManagement />
        </Layout>
      </Route>
      <Route path="/threat-detection">
        <Layout>
          <ThreatDetection />
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
      <Route path="/vulnerability-monitoring">
        <Layout>
          <MonitoringVulnerability />
        </Layout>
      </Route>
      <Route path="/basic-security-scan">
        <BasicSecurityScan />
      </Route>
      <Route path="/security-scanner">
        <Layout>
          <SecurityScanner />
        </Layout>
      </Route>
      <Route path="/pricing">
        <Pricing />
      </Route>
      <Route path="/solutions">
        <Solutions />
      </Route>
      
      {/* Resource Document Routes */}
      <Route path="/resources/datasheets/federal-zero-trust" component={DataSheetFederalZeroTrust} />
      <Route path="/resources/datasheets/critical-infrastructure" component={DataSheetCriticalInfrastructure} />
      <Route path="/resources/datasheets/rapid-response" component={DataSheetRapidResponse} />
      <Route path="/resources/datasheets/university-research" component={DataSheetUniversityResearch} />
      
      {/* Client Story Routes */}
      <Route path="/client-stories/federal-education-security" component={FederalEducationSecurity} />
      <Route path="/client-stories/university-ferpa-compliance" component={UniversityFerpaCompliance} />
      <Route path="/client-stories/k12-cost-savings" component={K12CostSavings} />
      
      {/* Marketing Document Viewer Routes */}
      <Route path="/marketing/documents/:type/:document" component={DocumentViewer} />
      <Route path="/marketing/articles/:article" component={ArticleViewer} />
      <Route path="/marketing/courses/:course" component={CourseViewer} />
      <Route path="/marketing/webinars/:webinar" component={CourseViewer} />
      <Route path="/marketing/case-studies/:useCase" component={ArticleViewer} />
      
        <Route component={NotFound} />
      </Switch>
      
    </>
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