import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield,
  Download,
  FileText,
  Users,
  Building2,
  GraduationCap,
  CheckCircle,
  Eye,
  BookOpen,
  Target,
  Lightbulb,
  Award,
  Clock,
  Star
} from "lucide-react";

export default function SuccessKits() {
  const federalKits = [
    {
      title: "Federal AI Security Compliance Kit",
      description: "Complete FISMA compliance templates with step-by-step implementation guides and FedRAMP certification preparation materials.",
      icon: Shield,
      color: "bg-red-500/10 text-red-400 border-red-500/30",
      features: [
        "FISMA compliance templates with automated reporting",
        "FedRAMP certification preparation frameworks",
        "Federal-specific security assessment tools",
        "Visual compliance roadmaps and timelines",
        "Documentation templates for federal submissions",
        "Interactive security evaluation tools"
      ],
      studyGuides: [
        "Top 20 FISMA Audit Questions & Answers",
        "FedRAMP Certification FAQ: Expert Responses",
        "Federal AI Compliance: Common Pitfalls & Solutions"
      ],
      keywords: "federal compliance, government security, FISMA tools, FedRAMP certification"
    },
    {
      title: "National Security AI Protection Kit",
      description: "Classified data handling procedures with multi-level security protocols and compartmentalized access control frameworks.",
      icon: Shield,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      features: [
        "Classified data handling procedures",
        "Compartmentalized access control frameworks",
        "National security threat response playbooks",
        "Security clearance requirements guide",
        "Threat matrix and vulnerability classification",
        "Step-by-step emergency response protocols"
      ],
      studyGuides: [
        "Classified Data Handling: Essential Protocols",
        "National Security Threat Assessment Framework",
        "Zero-Trust Architecture Implementation Guide"
      ],
      keywords: "national security, classified AI, government protection, security clearance"
    },
    {
      title: "Cross-Agency AI Security Coordination Kit",
      description: "Interagency communication templates and unified incident response frameworks with collaborative monitoring tools.",
      icon: Users,
      color: "bg-green-500/10 text-green-400 border-green-500/30",
      features: [
        "Interagency communication templates",
        "Unified incident response frameworks",
        "Collaborative security monitoring tools",
        "Standardized cross-agency sharing formats",
        "Joint response roles and responsibilities matrix",
        "Shared surveillance setup guides"
      ],
      studyGuides: [
        "Interagency Communication Best Practices",
        "Unified Response Protocols: Decision Trees",
        "Cross-Agency Data Sharing: Legal and Technical Requirements"
      ],
      keywords: "interagency security, government collaboration, unified response, cross-agency coordination"
    }
  ];

  const educationKits = [
    {
      title: "University Research AI Security Kit",
      description: "Academic data protection guidelines aligned with research requirements and collaborative project security frameworks.",
      icon: GraduationCap,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      features: [
        "Academic data protection guidelines",
        "Research integrity safeguards for AI systems",
        "Multi-institution collaboration security",
        "Research data security protocols",
        "Integrity assurance frameworks",
        "Collaborative project protection models"
      ],
      studyGuides: [
        "Academic Data Protection: Compliance and Best Practices",
        "Research Integrity in AI: Verification Methods",
        "Collaborative Research Security: Technical Implementation Guide"
      ],
      keywords: "research security, academic protection, university data, scholarly integrity"
    },
    {
      title: "Campus-Wide AI Security Implementation Kit",
      description: "Multi-department deployment strategies with student privacy protection tools and FERPA compliance frameworks.",
      icon: Building2,
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      features: [
        "Multi-department deployment strategies",
        "Student privacy protection tools",
        "Educational technology security assessment",
        "Cross-campus security coordination protocols",
        "Department-specific implementation guides",
        "FERPA compliance frameworks"
      ],
      studyGuides: [
        "Campus Security Leadership: Roles and Responsibilities",
        "Student Privacy Compliance: Key Requirements",
        "Educational Technology Risk Assessment Framework",
        "Cross-Departmental Security Coordination Best Practices"
      ],
      keywords: "campus security, university deployment, student privacy, educational technology"
    },
    {
      title: "Higher Education AI Security Pilot Kit",
      description: "Pilot program design templates with metrics collection frameworks and security experiment evaluation tools.",
      icon: Target,
      color: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      features: [
        "Pilot program design templates",
        "Metrics collection frameworks",
        "Security experiment evaluation tools",
        "Pilot-to-production transition roadmaps",
        "Controlled testing parameters",
        "Performance indicator dashboards"
      ],
      studyGuides: [
        "Designing Effective Security Pilot Programs",
        "Security Metrics That Matter: Measurement and Analysis",
        "From Pilot to Production: Security Scaling Strategies",
        "Common Security Pilot Pitfalls and How to Avoid Them"
      ],
      keywords: "security pilots, academic testing, university trials, experimental frameworks"
    },
    {
      title: "K-12 AI Student Safety Kit",
      description: "Age-appropriate security guidelines with classroom technology protection tools and student data privacy compliance.",
      icon: GraduationCap,
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      features: [
        "Age-appropriate security guidelines by grade level",
        "Classroom technology protection tools",
        "Student data privacy compliance (COPPA/FERPA)",
        "Parent communication templates",
        "Teacher administration interfaces",
        "Grade-specific implementation approaches"
      ],
      studyGuides: [
        "Age-Appropriate Security: Tailoring Protection by Grade Level",
        "COPPA and FERPA Compliance in K-12 AI Implementations",
        "Classroom Technology Safety: Teacher's Guide",
        "Parent Engagement: Security Awareness Communication"
      ],
      keywords: "K-12 security, student safety, classroom protection, educational compliance"
    }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 text-lg px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Success Kits
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Complete Implementation
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                  Success Kits
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Comprehensive toolkits with templates, guides, and resources for successful AI security implementation across government and educational organizations.
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Downloadable Resources</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <BookOpen className="w-5 h-5" />
                  <span>Study Guides Included</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Target className="w-5 h-5" />
                  <span>Implementation Templates</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Federal Government Success Kits */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Federal Government
                <span className="block text-blue-400">Success Kits</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Specialized toolkits for federal agencies implementing AI security with compliance requirements and national security considerations.
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
              {federalKits.map((kit, index) => (
                <Card key={index} className={`bg-slate-700/60 border ${kit.color.split(' ')[2]} hover:bg-slate-700/80 transition-all duration-300`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${kit.color}`}>
                        <kit.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-white mb-3">{kit.title}</CardTitle>
                        <p className="text-gray-300 mb-4">{kit.description}</p>
                        <div className="text-xs text-gray-400 mb-4">
                          <strong>Keywords:</strong> {kit.keywords}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          Core Components
                        </h4>
                        <ul className="space-y-2">
                          {kit.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                          Q&A Study Guides
                        </h4>
                        <ul className="space-y-2 mb-6">
                          {kit.studyGuides.map((guide, gIndex) => (
                            <li key={gIndex} className="flex items-start gap-2 text-sm text-gray-300">
                              <Star className="w-3 h-3 text-yellow-400 mt-1 flex-shrink-0" />
                              "{guide}"
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download Complete Kit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Success Kits */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Education Sector
                <span className="block text-green-400">Success Kits</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Comprehensive implementation guides for higher education institutions and K-12 districts implementing AI security solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {educationKits.map((kit, index) => (
                <Card key={index} className={`bg-slate-800/60 border ${kit.color.split(' ')[2]} hover:bg-slate-800/80 transition-all duration-300`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${kit.color}`}>
                        <kit.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-xl text-white">{kit.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{kit.description}</p>
                    <div className="text-xs text-gray-400">
                      <strong>Keywords:</strong> {kit.keywords}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2 text-sm flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          Core Components
                        </h4>
                        <ul className="space-y-1">
                          {kit.features.slice(0, 4).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-start gap-2 text-xs text-gray-300">
                              <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2 text-sm flex items-center gap-2">
                          <BookOpen className="w-3 h-3 text-blue-400" />
                          Study Guides
                        </h4>
                        <ul className="space-y-1 mb-4">
                          {kit.studyGuides.slice(0, 2).map((guide, gIndex) => (
                            <li key={gIndex} className="flex items-start gap-2 text-xs text-gray-300">
                              <Star className="w-2 h-2 text-yellow-400 mt-1 flex-shrink-0" />
                              "{guide}"
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                        <Download className="w-3 h-3 mr-2" />
                        Download Kit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Features */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                What's Included in
                <span className="block text-blue-400">Every Success Kit</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-700/60 border border-blue-500/30 text-center">
                <CardContent className="p-6">
                  <Download className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Downloadable Tools</h3>
                  <p className="text-sm text-gray-300">Templates, checklists, and implementation resources ready for immediate use.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-green-500/30 text-center">
                <CardContent className="p-6">
                  <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Assessment Tools</h3>
                  <p className="text-sm text-gray-300">Interactive questionnaires to guide users to relevant sections and resources.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-purple-500/30 text-center">
                <CardContent className="p-6">
                  <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Video Walkthroughs</h3>
                  <p className="text-sm text-gray-300">Step-by-step video guides for complex implementation procedures.</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-orange-500/30 text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Community Access</h3>
                  <p className="text-sm text-gray-300">Forums for practitioners to share experiences and get expert guidance.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 inline-block">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Clock className="w-8 h-8 text-blue-400" />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">Quarterly Updates</h3>
                      <p className="text-sm text-gray-300">Regular updates to keep compliance and security measures current with evolving threats and regulations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Implement AI Security?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Choose the success kit that matches your organization's needs and get started with proven implementation strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                <Download className="w-5 h-5 mr-2" />
                Browse All Success Kits
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Join Practitioner Community
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}