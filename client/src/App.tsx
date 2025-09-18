import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, lazy, Suspense } from "react";
import { Layout } from "@/components/Layout";
import { OnboardingModal } from "@/components/OnboardingModal";
import { useAuth } from "@/hooks/useAuth";
import { AuthProvider } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

// Error Boundary for lazy components
const LazyErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]"><Skeleton className="w-full h-[200px]" /></div>}>
      {children}
    </Suspense>
  );
};

const NotFound = lazy(() => import("@/pages/not-found"));

// Platform/Dashboard Pages - Lazy loaded for code splitting
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const ThreatMonitoring = lazy(() => import("@/pages/ThreatMonitoring"));
const ThreatAnalysis = lazy(() => import("@/pages/ThreatAnalysis"));
const ThreatDetection = lazy(() => import("@/pages/ThreatDetection"));
const Authentication = lazy(() => import("@/pages/Authentication"));
const FileSharing = lazy(() => import("@/pages/FileSharing"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const Achievements = lazy(() => import("@/pages/Achievements"));
const UserManagement = lazy(() => import("@/pages/UserManagement"));
const Reports = lazy(() => import("@/pages/Reports"));
const IncidentResponse = lazy(() => import("@/pages/IncidentResponse"));
const AdminPanel = lazy(() => import("@/pages/AdminPanel"));
const AIConfiguration = lazy(() => import("@/pages/AIConfiguration"));
const SecurityIntegrations = lazy(() => import("@/pages/SecurityIntegrations"));
const ITManagement = lazy(() => import("@/pages/ITManagement"));
const SecurityTraining = lazy(() => import("@/pages/SecurityTraining"));
const HelpDesk = lazy(() => import("@/pages/HelpDesk"));
const Resources = lazy(() => import("@/pages/Resources"));
const Courses = lazy(() => import("@/pages/Courses"));
const BlogPosts = lazy(() => import("@/pages/BlogPosts"));
const Handbooks = lazy(() => import("@/pages/Handbooks"));
const Webinars = lazy(() => import("@/pages/Webinars"));
const WhitePapers = lazy(() => import("@/pages/WhitePapers"));
const Podcasts = lazy(() => import("@/pages/Podcasts"));
const SuccessKits = lazy(() => import("@/pages/SuccessKits"));
const Videos = lazy(() => import("@/pages/Videos"));
const UseCases = lazy(() => import("@/pages/UseCases"));
const EBooks = lazy(() => import("@/pages/EBooks"));
const DataSheets = lazy(() => import("@/pages/DataSheets"));
const ClientStories = lazy(() => import("@/pages/ClientStories"));
const Demos = lazy(() => import("@/pages/Demos"));
const Integrations = lazy(() => import("@/pages/Integrations"));
const MarketingReports = lazy(() => import("@/pages/MarketingReports"));
const SecurityOverview = lazy(() => import("@/pages/SecurityOverview"));
const SecurityDashboard = lazy(() => import("@/pages/SecurityDashboard"));
const ThreatIntelligenceDashboard = lazy(() => import("@/pages/ThreatIntelligenceDashboard"));
const MISPLiveDashboard = lazy(() => import("@/pages/MISPLiveDashboard"));
const MISPBenefits = lazy(() => import("@/pages/MISPBenefits"));
const VulnerabilityTrendDashboard = lazy(() => import("@/pages/VulnerabilityTrendDashboard"));
const CydefDashboard = lazy(() => import("@/pages/CydefDashboard"));
const LiveLocationDashboard = lazy(() => import("@/pages/LiveLocationDashboard"));
// Advanced ACDS (Autonomous Cyber Defense Swarm) Dashboard - lazy loaded due to heavy 3D/map components
const ACDSDashboard = lazy(() => import("@/pages/ACDSDashboard"));
// Heavy 3D visualization component - lazy loaded to reduce initial bundle
const ThreatMap5D = lazy(() => import("@/pages/ThreatMap5D"));
// Revolutionary CypherHUM 5D Holographic AI Interface with Live Avatar - lazy loaded due to heavy dependencies
const CypherHumInterface = lazy(() => import("@/pages/CypherHumInterface"));

// Marketing Website Pages - Lazy loaded
const Home = lazy(() => import("@/pages/Home"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Leadership = lazy(() => import("@/pages/Leadership"));
const Awards = lazy(() => import("@/pages/Awards"));
const Contact = lazy(() => import("@/pages/Contact"));
const Solutions = lazy(() => import("@/pages/Solutions"));
const Services = lazy(() => import("@/pages/Services"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const SecurityScanner = lazy(() => import("@/pages/SecurityScanner"));
const BasicSecurityScan = lazy(() => import("@/pages/BasicSecurityScan"));
const Careers = lazy(() => import("@/pages/Careers"));
const Blogs = lazy(() => import("@/pages/Blogs"));
const News = lazy(() => import("@/pages/News"));
const ClientLogin = lazy(() => import("@/pages/ClientLogin").then(m => ({ default: m.ClientLogin })));
const ThreatReport2025 = lazy(() => import("@/pages/ThreatReport2025"));
const SecurityPlaybookSimulator = lazy(() => import("@/pages/SecurityPlaybookSimulator"));

// Marketing Document Viewers - Lazy loaded
const DocumentViewer = lazy(() => import("@/pages/marketing/DocumentViewer"));
const ArticleViewer = lazy(() => import("@/pages/marketing/ArticleViewer"));
const CourseViewer = lazy(() => import("@/pages/marketing/CourseViewer"));
const WhyCyberSecuredAI = lazy(() => import("@/pages/WhyCyberSecureAI"));
// Heavy demo with 3D/visualization components - lazy loaded
const FuturisticDemo = lazy(() => import("@/pages/FuturisticDemo"));

// Solutions Pages - Lazy loaded
const RansomwareProtection = lazy(() => import("@/pages/solutions/RansomwareProtection"));
const ZeroTrustSecurity = lazy(() => import("@/pages/solutions/ZeroTrustSecurity"));
const CloudSecurity = lazy(() => import("@/pages/solutions/CloudSecurity"));
const AIThreatDetection = lazy(() => import("@/pages/solutions/AIThreatDetection"));
const K12Education = lazy(() => import("@/pages/solutions/K12Education"));
const HigherEducation = lazy(() => import("@/pages/solutions/HigherEducation"));
const MunicipalGovernment = lazy(() => import("@/pages/solutions/MunicipalGovernment"));
const FederalAgencies = lazy(() => import("@/pages/solutions/FederalAgencies"));

// Platform Pages - Lazy loaded
const Platform = lazy(() => import("@/pages/Platform"));
const AutomatedIncidentResponse = lazy(() => import("@/pages/platform/AutomatedIncidentResponse"));
const PlatformThreatDetection = lazy(() => import("@/pages/platform/ThreatDetection"));
const PredictiveRiskAnalysis = lazy(() => import("@/pages/platform/PredictiveRiskAnalysis"));
const ComplianceAutomation = lazy(() => import("@/pages/platform/ComplianceAutomation"));
const PlatformSecurityTraining = lazy(() => import("@/pages/platform/SecurityTraining"));
const MonitoringVulnerability = lazy(() => import("@/pages/platform/MonitoringVulnerability"));
const FirewallManagement = lazy(() => import("@/pages/platform/FirewallManagement"));
const NetworkMonitoring = lazy(() => import("@/pages/platform/NetworkMonitoring"));
const ZeroTrustArchitecture = lazy(() => import("@/pages/platform/ZeroTrustArchitecture"));
const IdentityAccessManagement = lazy(() => import("@/pages/platform/IdentityAccessManagement"));
const SystemAdministration = lazy(() => import("@/pages/platform/SystemAdministration"));
const HardwareSecurityModules = lazy(() => import("@/pages/platform/HardwareSecurityModules"));
const BiometricAuthentication = lazy(() => import("@/pages/platform/BiometricAuthentication"));
const EnhancedThreatIntelligence = lazy(() => import("@/pages/platform/EnhancedThreatIntelligence"));
const SecurityInfrastructureMonitoring = lazy(() => import("@/pages/platform/SecurityInfrastructureMonitoring"));
const EnterpriseIAM = lazy(() => import("@/pages/platform/EnterpriseIAM"));
// Heavy ML/Analytics component - lazy loaded
const MLAnalytics = lazy(() => import("@/pages/platform/MLAnalytics"));
const ThreatConnectAttribution = lazy(() => import("@/pages/platform/ThreatConnectAttribution"));
const IBMXForceIntelligence = lazy(() => import("@/pages/platform/IBMXForceIntelligence"));
const AlternativeThreatFeeds = lazy(() => import("@/pages/platform/AlternativeThreatFeeds"));
const TaxiiStixManagement = lazy(() => import("@/pages/platform/TaxiiStixManagement"));
const MandiantIntelligence = lazy(() => import("@/pages/platform/MandiantIntelligence").then(m => ({ default: m.MandiantIntelligence })));
const TheHiveIntegration = lazy(() => import("@/pages/TheHiveIntegration").then(m => ({ default: m.TheHiveIntegration })));
// Legal and Compliance Pages - Lazy loaded
const LegalDocumentation = lazy(() => import("@/pages/LegalDocumentation"));
const LegalNew = lazy(() => import("@/pages/LegalNew"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const AcceptableUsePolicy = lazy(() => import("@/pages/AcceptableUsePolicy"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const DataSecurityPolicy = lazy(() => import("@/pages/DataSecurityPolicy"));
const RefundPolicy = lazy(() => import("@/pages/RefundPolicy"));
const ServiceLevelAgreement = lazy(() => import("@/pages/ServiceLevelAgreement"));
const GDPRCompliance = lazy(() => import("@/pages/GDPRCompliance"));
const FERPACompliance = lazy(() => import("@/pages/FERPACompliance"));
const CCPACompliance = lazy(() => import("@/pages/CCPACompliance"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse"));
const VulnerabilityDisclosure = lazy(() => import("@/pages/VulnerabilityDisclosure"));
const COPPACompliance = lazy(() => import("@/pages/COPPACompliance"));
const SMSMessagingPolicy = lazy(() => import("@/pages/SMSMessagingPolicy"));
const AIEthicsStatement = lazy(() => import("@/pages/AIEthicsStatement"));
const EnterpriseSecurity = lazy(() => import("@/pages/EnterpriseSecurity"));
const ExternalIntegrationsPage = lazy(() => import("@/pages/ExternalIntegrations"));

// Resource Pages - Lazy loaded
const DataSheetFederalZeroTrust = lazy(() => import("@/pages/resources/DataSheetFederalZeroTrust"));
const DataSheetCriticalInfrastructure = lazy(() => import("@/pages/resources/DataSheetCriticalInfrastructure"));
const DataSheetRapidResponse = lazy(() => import("@/pages/resources/DataSheetRapidResponse"));
const DataSheetUniversityResearch = lazy(() => import("@/pages/resources/DataSheetUniversityResearch"));

// Client Story Pages - Lazy loaded
const FederalEducationSecurity = lazy(() => import("@/pages/client-stories/FederalEducationSecurity"));
const UniversityFerpaCompliance = lazy(() => import("@/pages/client-stories/UniversityFerpaCompliance"));
const K12CostSavings = lazy(() => import("@/pages/client-stories/K12CostSavings"));

function Router() {
  const { user, isLoading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);
    
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
                          location.startsWith('/support') ||
                          location.startsWith('/cydef-dashboard') ||
                          location.startsWith('/live-location-dashboard') ||
                          location.startsWith('/acds-dashboard') ||
                          location.startsWith('/cypherhum-interface');

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
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-interactive"></div></div>}>
        <Switch>
        {/* Marketing Website Routes (no Layout wrapper) */}
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/leadership" component={Leadership} />
      <Route path="/about/leadership" component={Leadership} />
      <Route path="/about/awards" component={Awards} />
      <Route path="/contact" component={Contact} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/careers" component={Careers} />
      <Route path="/legal" component={LegalNew} />
      <Route path="/legal/terms-of-service" component={TermsOfService} />
      <Route path="/legal/privacy-policy" component={PrivacyPolicy} />
      <Route path="/legal/acceptable-use-policy" component={AcceptableUsePolicy} />
      <Route path="/legal/cookie-policy" component={CookiePolicy} />
      <Route path="/legal/data-security-policy" component={DataSecurityPolicy} />
      <Route path="/legal/refund-policy" component={RefundPolicy} />
      <Route path="/legal/service-level-agreement" component={ServiceLevelAgreement} />
      <Route path="/legal/gdpr-compliance" component={GDPRCompliance} />
      <Route path="/legal/ferpa-compliance" component={FERPACompliance} />
      <Route path="/legal/ccpa-compliance" component={CCPACompliance} />
      <Route path="/legal/terms-of-use" component={TermsOfUse} />
      <Route path="/legal/vulnerability-disclosure" component={VulnerabilityDisclosure} />
      <Route path="/legal/coppa-compliance" component={COPPACompliance} />
      <Route path="/legal/sms-messaging-policy" component={SMSMessagingPolicy} />
      <Route path="/legal/ai-ethics-statement" component={AIEthicsStatement} />
      <Route path="/legaldocumentation" component={LegalDocumentation} />
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
      <Route path="/cydef-dashboard">
        <Layout>
          <CydefDashboard />
        </Layout>
      </Route>
      
      <Route path="/live-location-dashboard">
        <Layout>
          <LiveLocationDashboard />
        </Layout>
      </Route>
      
      {/* ACDS (Autonomous Cyber Defense Swarm) Advanced Dashboard */}
      <Route path="/acds-dashboard">
        <Layout>
          <LazyErrorBoundary>
            <ACDSDashboard />
          </LazyErrorBoundary>
        </Layout>
      </Route>
      
      <Route path="/threat-map-5d">
        <Layout>
          <ThreatMap5D />
        </Layout>
      </Route>
      
      {/* CypherHUM Revolutionary 3D Holographic AI Interface */}
      <Route path="/cypherhum-interface">
        <Layout>
          <LazyErrorBoundary>
            <CypherHumInterface />
          </LazyErrorBoundary>
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
      <Route path="/platform/threatconnect-attribution">
        <Layout>
          <ThreatConnectAttribution />
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
      <Route path="/platform/taxii-stix-management">
        <Layout>
          <TaxiiStixManagement />
        </Layout>
      </Route>
      <Route path="/platform/mandiant-intelligence">
        <Layout>
          <MandiantIntelligence />
        </Layout>
      </Route>

      <Route path="/platform/thehive-integration">
        <Layout>
          <TheHiveIntegration />
        </Layout>
      </Route>
      <Route path="/integrations/external">
        <Layout>
          <ExternalIntegrationsPage />
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
      </Suspense>
      
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;