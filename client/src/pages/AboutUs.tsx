import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Brain, 
  Users, 
  Award, 
  Target, 
  Zap,
  CheckCircle,
  TrendingUp,
  Globe,
  Lock,
  Bot,
  GraduationCap,
  Flag
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      background: "Former CISO at Department of Education, 15+ years cybersecurity leadership",
      expertise: ["Federal Compliance", "Education Security", "Risk Management"]
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer", 
      background: "Ex-Google AI researcher, PhD Computer Science from Stanford",
      expertise: ["AI/ML Development", "Threat Detection", "Security Architecture"]
    },
    {
      name: "Jennifer Kim",
      role: "VP of Government Relations",
      background: "Former GSA cybersecurity advisor, 12+ years federal procurement",
      expertise: ["Government Contracts", "Compliance Frameworks", "Policy Development"]
    },
    {
      name: "David Thompson",
      role: "Chief Security Officer",
      background: "20+ years in cybersecurity, former NSA security analyst",
      expertise: ["Incident Response", "Threat Intelligence", "Security Operations"]
    }
  ];

  const milestones = [
    { year: "2023", event: "Company Founded", description: "Established with focus on education and government cybersecurity" },
    { year: "2024", event: "AI Platform Launch", description: "Released first AI-powered threat detection system" },
    { year: "2024", event: "Compliance Certification", description: "Achieved FedRAMP and FISMA compliance certifications" },
    { year: "2024", event: "$50M Series A", description: "Secured funding to expand platform capabilities and market reach" }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 90%', filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.2)'}} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2 font-sans">
                <span>About CyberSecure AI</span>
              </h1>
              <p className="text-gray-400 font-secondary"><span className="text-cyan-400 font-semibold">Trustworthy</span>, <span className="text-cyan-400 font-semibold">innovative</span>, and <span className="text-cyan-400 font-semibold">professional</span> cybersecurity leadership for education and government sectors</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-6xl">
          {/* Mission Statement */}
          <section className="mb-16">
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center font-sans">Our Mission & Promise</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-300 mb-6 max-w-4xl mx-auto font-secondary">
                  <span className="text-cyan-400 font-semibold">To deliver reliable, AI-powered cybersecurity solutions that protect and empower education and government organizations while ensuring compliance and operational excellence.</span> 
                  We are <span className="text-cyan-400 font-semibold">forward-thinking</span> and <span className="text-cyan-400 font-semibold">responsive</span>, combining advanced artificial 
                  intelligence with deep sector expertise through our commitment to <span className="text-cyan-400 font-semibold">innovation</span>, <span className="text-cyan-400 font-semibold">security</span>, <span className="text-cyan-400 font-semibold">integrity</span>, <span className="text-cyan-400 font-semibold">accessibility</span>, and <span className="text-cyan-400 font-semibold">compliance</span>.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-secondary">Innovation</Badge>
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-secondary">Security</Badge>
                  <Badge className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-secondary">Integrity</Badge>
                  <Badge className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-secondary">Accessibility</Badge>
                  <Badge className="bg-gradient-to-r from-cyan-700 to-blue-600 text-white font-secondary">Compliance</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Company Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12 font-sans">Our Brand Values & Personality</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '70% 10%', filter: 'hue-rotate(200deg) saturate(1.5) brightness(1.2)'}} />
                  </div>
                  <CardTitle className="text-xl text-white font-sans">Security & Trust</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 font-secondary">
                    <span className="text-cyan-400 font-semibold">Trustworthy</span> and <span className="text-cyan-400 font-semibold">professional</span> - every decision prioritizes security and protection of our clients' data, 
                    systems, and stakeholders. We build with security as the foundation, demonstrating our <span className="text-cyan-400 font-semibold">integrity</span>.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 90%', filter: 'hue-rotate(280deg) saturate(1.5) brightness(1.2)'}} />
                  </div>
                  <CardTitle className="text-xl text-white">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    We leverage cutting-edge AI and machine learning technologies to stay ahead of evolving 
                    threats and provide our clients with the most advanced cybersecurity solutions available.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />
                  </div>
                  <CardTitle className="text-xl text-white">Service Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    We are committed to delivering exceptional service and support to our clients, 
                    understanding their unique challenges and providing solutions that truly meet their needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(20deg) saturate(1.5) brightness(1.2)'}} />
                  </div>
                  <CardTitle className="text-xl text-white">Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    We maintain the highest standards of regulatory compliance across all frameworks, 
                    ensuring our clients meet their legal and regulatory obligations effortlessly.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '30% 40%', filter: 'hue-rotate(0deg) saturate(1.5) brightness(1.2)'}} />
                  </div>
                  <CardTitle className="text-xl text-white">Sector Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Our deep expertise in education and government sectors allows us to deliver 
                    specialized solutions that address the unique challenges these organizations face.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 70%', filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.2)'}} />
                  </div>
                  <CardTitle className="text-xl text-white">Agility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    We adapt quickly to the evolving threat landscape and changing client needs, 
                    ensuring our solutions remain effective and relevant in the face of new challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Leadership Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 40%', filter: 'brightness(1.2) saturate(1.5)'}} />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{member.name}</CardTitle>
                        <p className="text-cyan-400 font-medium">{member.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{member.background}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-gray-300 border-gray-500">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Company Milestones */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Company Milestones</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-green-400">{milestone.year}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{milestone.event}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Competitive Advantages */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center space-x-2">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 90%', filter: 'hue-rotate(200deg) saturate(1.5) brightness(1.2)'}} />
                    <span>Sector-Specific Expertise</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Unlike generic cybersecurity providers, we specialize exclusively in education and 
                    government sectors, understanding their unique challenges, compliance requirements, 
                    and operational constraints.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Deep understanding of FERPA, CIPA, FISMA</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Experience with government procurement</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Education-focused security training</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center space-x-2">
                    <div className="w-6 h-6 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 90%', filter: 'hue-rotate(280deg) saturate(1.5) brightness(1.2)'}} />
                    <span>Advanced AI Technology</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Our platform leverages state-of-the-art artificial intelligence and machine learning 
                    algorithms to provide proactive threat detection, predictive analysis, and automated 
                    incident response capabilities.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Real-time threat classification</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Predictive risk modeling</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Automated response playbooks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center space-x-2">
                    <Flag className="w-6 h-6 text-orange-400" />
                    <span>Comprehensive Compliance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Our platform provides automated compliance management across multiple regulatory 
                    frameworks, ensuring organizations maintain compliance without manual oversight.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Multi-framework automation</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Continuous monitoring</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Audit-ready reporting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    <span>Scalable Architecture</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    From small school districts to large federal agencies, our platform scales to meet 
                    the needs of organizations of all sizes with flexible deployment and pricing options.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Cloud-native architecture</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Flexible user licensing</li>
                    <li className="flex items-center"><div className="w-4 h-4 mr-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '10% 40%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />Modular service offerings</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-3xl font-bold text-white text-center mb-12">Certifications & Compliance</h2>
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Flag className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">FedRAMP</h3>
                    <p className="text-gray-400 text-sm">Authorized</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '70% 10%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />
                    </div>
                    <h3 className="text-lg font-bold text-white">FISMA</h3>
                    <p className="text-gray-400 text-sm">Compliant</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">FERPA</h3>
                    <p className="text-gray-400 text-sm">Certified</p>
                  </div>
                  <div>
                    <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">SOC 2</h3>
                    <p className="text-gray-400 text-sm">Type II</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      </div>
    </MarketingLayout>
  );
}