import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Settings, Shield, Info } from "lucide-react";

export default function CookiePolicy() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-yellow-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-yellow-400 text-yellow-400">
                <Cookie className="h-4 w-4 mr-2" />
                Cookie Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                CyberSecured AI Enterprise Cybersecurity Platform
              </p>
              <p className="text-yellow-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-300 mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work more efficiently, provide reporting 
                information, and deliver personalized experiences.
              </p>
              <p className="text-gray-300">
                CyberSecured AI uses cookies to enhance your security experience, maintain session state, and provide 
                essential cybersecurity functionality.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">2. Why We Use Cookies</h2>
              <p className="text-gray-300 mb-4">We use cookies for several important reasons:</p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Security:</strong> Protecting against unauthorized access and security threats</li>
                <li><strong>Authentication:</strong> Managing user sessions and multi-factor authentication</li>
                <li><strong>Functionality:</strong> Remembering preferences and customizations</li>
                <li><strong>Performance:</strong> Optimizing platform speed and reliability</li>
                <li><strong>Analytics:</strong> Understanding how users interact with security features</li>
                <li><strong>Compliance:</strong> Meeting regulatory requirements for audit trails</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">3. Types of Cookies We Use</h2>
              
              <Card className="bg-blue-500/10 border-blue-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-blue-200 font-semibold mb-2">Essential Security Cookies</h4>
                    <p className="text-gray-300 mb-2">
                      These cookies are necessary for the website to function and cannot be switched off. 
                      They are usually only set in response to actions made by you.
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Session management and authentication</li>
                      <li>• CSRF protection tokens</li>
                      <li>• Load balancing and security routing</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <Settings className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-200 font-semibold mb-2">Functional Cookies</h4>
                    <p className="text-gray-300 mb-2">
                      These cookies enable the website to provide enhanced functionality and personalization.
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• User preferences and settings</li>
                      <li>• Dashboard customizations</li>
                      <li>• Language and region settings</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="bg-purple-500/10 border-purple-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <Info className="h-6 w-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-purple-200 font-semibold mb-2">Analytics Cookies</h4>
                    <p className="text-gray-300 mb-2">
                      These cookies help us understand how visitors interact with our platform.
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Usage analytics and performance metrics</li>
                      <li>• Security feature effectiveness</li>
                      <li>• Error tracking and diagnostics</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">4. Cookie Duration</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Session Cookies</h3>
              <p className="text-gray-300 mb-4">
                These are temporary cookies that remain in your browser only while you have it open. 
                They are deleted when you close your browser.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Persistent Cookies</h3>
              <p className="text-gray-300 mb-4">
                These cookies remain on your device for a set period or until you delete them. 
                We use these to remember your preferences across sessions.
              </p>

              <div className="bg-slate-800/50 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Typical Cookie Lifespans:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Authentication tokens: Session duration or 24 hours</li>
                  <li>• User preferences: 1 year</li>
                  <li>• Analytics data: 2 years</li>
                  <li>• Security settings: 6 months</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Browser Controls</h3>
              <p className="text-gray-300 mb-4">
                Most web browsers allow you to control cookies through their settings preferences. 
                You can typically:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>View what cookies are stored and delete them individually</li>
                <li>Block third-party cookies</li>
                <li>Block cookies from particular sites</li>
                <li>Block all cookies from being set</li>
                <li>Delete all cookies when you close the browser</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Platform Settings</h3>
              <p className="text-gray-300 mb-4">
                Within the CyberSecured AI platform, you can manage certain cookie preferences through:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>User Account Settings → Privacy Preferences</li>
                <li>Dashboard → Cookie Management</li>
                <li>System Administration → Organization Cookie Policy</li>
              </ul>

              <Card className="bg-yellow-500/10 border-yellow-500/30 p-6 mt-4">
                <div className="flex items-start gap-3">
                  <Cookie className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-200 font-semibold mb-2">Important Note:</p>
                    <p className="text-gray-300">
                      Disabling certain cookies may impact the functionality of our cybersecurity platform. 
                      Essential security cookies cannot be disabled as they are critical for platform operation.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">6. Third-Party Cookies</h2>
              <p className="text-gray-300 mb-4">
                We may use third-party services that set their own cookies. These include:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Security Services:</strong> Threat intelligence and protection services</li>
                <li><strong>Analytics Providers:</strong> Platform usage and performance monitoring</li>
                <li><strong>CDN Services:</strong> Content delivery and acceleration</li>
                <li><strong>Authentication Services:</strong> Single sign-on and identity management</li>
              </ul>
              <p className="text-gray-300">
                These third parties have their own privacy policies and cookie practices, which we encourage you to review.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">7. Updates to Cookie Policy</h2>
              <p className="text-gray-300">
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. 
                We will notify users of any material changes and update the effective date at the top of this policy.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-yellow-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Cookie className="h-5 w-5 text-yellow-400" />
                Cookie Policy Questions
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Privacy Team:</strong> privacy@cybersecuredai.com</p>
                <p><strong>Technical Support:</strong> support@cybersecuredai.com</p>
                <p><strong>General Contact:</strong> legal@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  If you have questions about our use of cookies or need assistance with cookie settings, 
                  please contact our privacy team. We typically respond within 2-3 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}