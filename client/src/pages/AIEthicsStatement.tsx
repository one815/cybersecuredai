import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Shield, CheckCircle } from "lucide-react";
// Webp image placeholder since referenced webp file doesn't exist in attached_assets
const cypherAiGenImage = "/api/placeholder/24/24";

export default function AIEthicsStatement() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-purple-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-purple-400 text-purple-400">
                <img src={cypherAiGenImage} alt="Cypher AI Gen" className="h-4 w-4 mr-2 rounded-full" />
                AI Ethics Statement
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                AI Ethics Statement
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Responsible Artificial Intelligence for Cybersecurity
              </p>
              <p className="text-purple-400 font-semibold">
                Effective Date: September 6, 2025 | Version 1.0
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* AI Commitment Notice */}
          <Card className="mb-8 bg-green-500/10 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <img src={cypherAiGenImage} alt="Cypher AI Gen" className="h-6 w-6 rounded-full flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-200 font-semibold mb-2">🤖 Our AI Commitment:</p>
                  <p className="text-gray-300">
                    CyberSecured AI is committed to developing and deploying artificial intelligence systems that are 
                    responsible, transparent, fair, and aligned with human values. Our AI technologies enhance cybersecurity 
                    capabilities while respecting privacy, promoting inclusivity, and maintaining human oversight.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">1. Our AI Ethics Principles</h2>
              
              <Card className="bg-blue-500/10 border-blue-500/30 p-6 mb-4">
                <h3 className="text-xl font-semibold text-white mb-3">1.1 Human-Centered AI</h3>
                <p className="text-blue-200 mb-3">
                  <strong>Principle:</strong> AI systems should augment human capabilities, not replace human judgment 
                  in critical security decisions.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>Human oversight maintained for all high-stakes security decisions</li>
                  <li>Clear escalation paths for AI-flagged security incidents</li>
                  <li>User control and customization of AI-driven recommendations</li>
                  <li>Meaningful human involvement in AI system design and deployment</li>
                </ul>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                <h3 className="text-xl font-semibold text-white mb-3">1.2 Transparency and Explainability</h3>
                <p className="text-green-200 mb-3">
                  <strong>Principle:</strong> AI systems should be interpretable and their decisions explainable 
                  to users and stakeholders.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>Clear documentation of AI model capabilities and limitations</li>
                  <li>Explanations provided for AI-driven security recommendations</li>
                  <li>Transparency about data sources and training methodologies</li>
                  <li>Regular reporting on AI system performance and bias metrics</li>
                </ul>
              </Card>

              <Card className="bg-orange-500/10 border-orange-500/30 p-6 mb-4">
                <h3 className="text-xl font-semibold text-white mb-3">1.3 Fairness and Non-Discrimination</h3>
                <p className="text-orange-200 mb-3">
                  <strong>Principle:</strong> AI systems should treat all users fairly and avoid discriminatory outcomes.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>Regular bias testing and mitigation in AI algorithms</li>
                  <li>Inclusive training data and diverse development teams</li>
                  <li>Equitable access to AI-powered security features</li>
                  <li>Continuous monitoring for unintended discriminatory impacts</li>
                </ul>
              </Card>

              <Card className="bg-red-500/10 border-red-500/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">1.4 Privacy and Data Protection</h3>
                <p className="text-red-200 mb-3">
                  <strong>Principle:</strong> AI systems must respect user privacy and protect sensitive information.
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>Privacy-preserving machine learning techniques</li>
                  <li>Minimal data collection for AI training and inference</li>
                  <li>Secure data handling and storage practices</li>
                  <li>User control over personal data used in AI systems</li>
                </ul>
              </Card>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">2. AI Implementation Framework</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Development Lifecycle</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Ethics by Design:</strong> Ethical considerations integrated from project inception</li>
                <li><strong>Diverse Teams:</strong> Multidisciplinary teams including ethics experts</li>
                <li><strong>Stakeholder Engagement:</strong> Regular consultation with users and affected communities</li>
                <li><strong>Impact Assessment:</strong> Comprehensive evaluation of potential societal impacts</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Testing and Validation</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Bias Testing:</strong> Systematic testing for algorithmic bias across different populations</li>
                <li><strong>Adversarial Testing:</strong> Red team exercises to identify potential misuse</li>
                <li><strong>Performance Monitoring:</strong> Continuous monitoring of AI system performance</li>
                <li><strong>External Audits:</strong> Regular third-party audits of AI systems</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.3 Deployment and Monitoring</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Gradual Rollout:</strong> Phased deployment with careful monitoring</li>
                <li><strong>Feedback Loops:</strong> Mechanisms for user feedback and system improvement</li>
                <li><strong>Performance Tracking:</strong> Real-time monitoring of AI system behavior</li>
                <li><strong>Incident Response:</strong> Rapid response procedures for AI-related issues</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">3. Specific AI Applications in Cybersecurity</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Threat Detection and Analysis</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                <p className="text-white font-semibold mb-2">Ethical Considerations:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Balance between security effectiveness and privacy protection</li>
                  <li>• Minimize false positives to avoid security fatigue</li>
                  <li>• Provide clear explanations for threat classifications</li>
                  <li>• Maintain audit trails for security decisions</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Automated Response Systems</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
                <p className="text-white font-semibold mb-2">Ethical Safeguards:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Human approval required for high-impact automated actions</li>
                  <li>• Clear boundaries on autonomous system capabilities</li>
                  <li>• Fail-safe mechanisms and manual override options</li>
                  <li>• Comprehensive logging of all automated actions</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">3.3 Predictive Analytics</h3>
              <div className="bg-slate-800/50 p-4 rounded-lg">
                <p className="text-white font-semibold mb-2">Responsible Practices:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Transparent communication of prediction confidence levels</li>
                  <li>• Regular validation of predictive models against actual outcomes</li>
                  <li>• Protection against over-reliance on predictive insights</li>
                  <li>• Consideration of potential unintended consequences</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">4. Data Governance for AI</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Data Collection and Use</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Purpose Limitation:</strong> Data collected only for specified, legitimate cybersecurity purposes</li>
                <li><strong>Data Minimization:</strong> Collect only data necessary for AI system functionality</li>
                <li><strong>Consent Management:</strong> Clear consent mechanisms for AI data use</li>
                <li><strong>Quality Assurance:</strong> Regular data quality audits and cleaning processes</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Training Data Ethics</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Representative Datasets:</strong> Ensure training data represents diverse populations</li>
                <li><strong>Bias Identification:</strong> Systematic identification and mitigation of data biases</li>
                <li><strong>Data Provenance:</strong> Clear documentation of data sources and collection methods</li>
                <li><strong>Synthetic Data:</strong> Use of synthetic data to protect privacy while maintaining model quality</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Data Retention and Deletion</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Retention Policies:</strong> Clear policies for AI training and operational data retention</li>
                <li><strong>Right to Deletion:</strong> Mechanisms to honor data deletion requests</li>
                <li><strong>Secure Disposal:</strong> Secure deletion of data no longer needed</li>
                <li><strong>Model Updates:</strong> Procedures for updating models when training data is deleted</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">5. Human Oversight and Control</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Human-in-the-Loop Systems</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Critical Decision Points:</strong> Human review required for high-risk security decisions</li>
                <li><strong>Escalation Procedures:</strong> Clear procedures for escalating AI recommendations</li>
                <li><strong>Override Capabilities:</strong> Ability for humans to override AI decisions</li>
                <li><strong>Continuous Learning:</strong> AI systems learn from human feedback and corrections</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 User Agency and Control</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Customization Options:</strong> Users can customize AI system behavior and thresholds</li>
                <li><strong>Opt-Out Mechanisms:</strong> Clear options to disable or limit AI features</li>
                <li><strong>Transparency Tools:</strong> Dashboards showing AI system activity and decisions</li>
                <li><strong>Feedback Channels:</strong> Easy ways for users to report AI system issues</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.3 Professional Training</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>AI Literacy:</strong> Training for security professionals on AI capabilities and limitations</li>
                <li><strong>Ethical Training:</strong> Regular training on AI ethics and responsible use</li>
                <li><strong>Decision Support:</strong> Tools and training to help humans make better AI-assisted decisions</li>
                <li><strong>Continuous Education:</strong> Ongoing education on emerging AI technologies and practices</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">6. Accountability and Governance</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 AI Governance Structure</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>AI Ethics Committee:</strong> Cross-functional committee overseeing AI ethics compliance</li>
                <li><strong>Chief AI Officer:</strong> Executive leadership responsible for AI strategy and ethics</li>
                <li><strong>External Advisory Board:</strong> Independent experts providing guidance on AI ethics</li>
                <li><strong>Regular Reviews:</strong> Periodic reviews of AI systems and ethical practices</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Compliance and Auditing</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Regular Audits:</strong> Internal and external audits of AI systems</li>
                <li><strong>Compliance Monitoring:</strong> Continuous monitoring for regulatory compliance</li>
                <li><strong>Documentation:</strong> Comprehensive documentation of AI decision-making processes</li>
                <li><strong>Incident Reporting:</strong> Clear procedures for reporting and investigating AI-related incidents</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.3 Continuous Improvement</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Performance Metrics:</strong> Regular measurement of AI system fairness and effectiveness</li>
                <li><strong>Feedback Integration:</strong> Systematic integration of user and stakeholder feedback</li>
                <li><strong>Policy Updates:</strong> Regular updates to AI ethics policies based on learnings</li>
                <li><strong>Industry Collaboration:</strong> Active participation in industry AI ethics initiatives</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">7. Future Commitments</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">7.1 Emerging Technologies</h3>
              <p className="text-gray-300 mb-4">
                As AI technology evolves, we commit to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Staying current with ethical AI research and best practices</li>
                <li>Adapting our policies to address new ethical challenges</li>
                <li>Engaging with the broader AI ethics community</li>
                <li>Contributing to the development of industry standards</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">7.2 Research and Development</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Ethical Research:</strong> Support for research into AI safety and ethics</li>
                <li><strong>Open Science:</strong> Contribution to open research on AI ethics in cybersecurity</li>
                <li><strong>Collaboration:</strong> Partnership with academic institutions and research organizations</li>
                <li><strong>Innovation:</strong> Development of new techniques for ethical AI deployment</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-purple-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                AI Ethics Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>AI Ethics Committee:</strong> ai-ethics@cybersecuredai.com</p>
                <p><strong>Chief AI Officer:</strong> cai-officer@cybersecuredai.com</p>
                <p><strong>AI Governance:</strong> ai-governance@cybersecuredai.com</p>
                <p><strong>Research Partnerships:</strong> research@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For questions about our AI ethics practices or to report concerns about AI system behavior, 
                  please contact our AI Ethics Committee. We are committed to addressing all inquiries promptly and transparently.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}