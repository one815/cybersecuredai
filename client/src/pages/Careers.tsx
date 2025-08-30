import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MapPin, 
  Clock, 
  DollarSign,
  Brain,
  Shield,
  Code,
  Database,
  Network,
  Award,
  CheckCircle,
  Heart,
  Coffee,
  Laptop,
  Bot,
  Building,
  GraduationCap
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  icon: JSX.Element;
}

export default function Careers() {
  const jobs: Job[] = [
    {
      id: "ai-engineer",
      title: "Senior AI/ML Engineer",
      department: "Engineering",
      location: "Remote / San Francisco, CA",
      type: "Full-time",
      salary: "$150,000 - $200,000",
      description: "Lead the development of AI-powered threat detection and predictive analysis systems for cybersecurity applications in education and government sectors.",
      requirements: [
        "PhD or MS in Computer Science, AI/ML, or related field",
        "5+ years experience in machine learning and AI development",
        "Experience with TensorFlow, PyTorch, or similar frameworks",
        "Strong background in cybersecurity applications",
        "Experience with real-time threat detection systems"
      ],
      benefits: ["Equity package", "Remote work", "AI research budget", "Conference attendance"],
      icon: <Brain className="w-6 h-6 text-purple-400" />
    },
    {
      id: "security-architect",
      title: "Principal Security Architect",
      department: "Security", 
      location: "Washington, DC / Remote",
      type: "Full-time",
      salary: "$180,000 - $230,000",
      description: "Design and implement comprehensive security architectures for educational institutions and government agencies, ensuring compliance with FERPA, FISMA, and FedRAMP requirements.",
      requirements: [
        "10+ years cybersecurity architecture experience",
        "Expert knowledge of NIST frameworks and government compliance",
        "Experience with zero-trust architecture implementation", 
        "Security clearance preferred",
        "Leadership and mentoring experience"
      ],
      benefits: ["Security clearance bonus", "Government project exposure", "Certification funding", "Leadership training"],
      icon: <Shield className="w-6 h-6 text-green-400" />
    },
    {
      id: "devops-engineer",
      title: "Senior DevOps Engineer",
      department: "Engineering",
      location: "Remote / Austin, TX", 
      type: "Full-time",
      salary: "$130,000 - $170,000",
      description: "Build and maintain scalable cloud infrastructure for AI-powered cybersecurity platforms, focusing on high-availability and compliance requirements.",
      requirements: [
        "5+ years DevOps and cloud infrastructure experience",
        "Expert-level Kubernetes, Docker, and cloud platforms (AWS/Azure/GCP)",
        "Experience with compliance automation and STIG implementation",
        "Infrastructure as Code (Terraform, Ansible) expertise",
        "CI/CD pipeline development and optimization"
      ],
      benefits: ["Cloud certification reimbursement", "On-call compensation", "Home office setup", "Flexible schedule"],
      icon: <Network className="w-6 h-6 text-blue-400" />
    },
    {
      id: "fullstack-developer",
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / Boston, MA",
      type: "Full-time", 
      salary: "$120,000 - $160,000",
      description: "Develop intuitive user interfaces and robust backend systems for cybersecurity dashboards and compliance management platforms serving education and government clients.",
      requirements: [
        "5+ years full-stack development experience",
        "React, TypeScript, Node.js, and modern web technologies",
        "Experience with security-focused UI/UX design",
        "Knowledge of data visualization and dashboard development",
        "Understanding of cybersecurity principles and best practices"
      ],
      benefits: ["Tech stipend", "Professional development", "Flexible PTO", "Stock options"],
      icon: <Code className="w-6 h-6 text-cyan-400" />
    },
    {
      id: "compliance-specialist",
      title: "Government Compliance Specialist",
      department: "Compliance",
      location: "Washington, DC",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      description: "Ensure CyberSecured AI platforms meet all regulatory requirements for education and government sectors, managing compliance frameworks and audit processes.",
      requirements: [
        "Bachelor's degree in relevant field or equivalent experience",
        "3+ years experience with FERPA, FISMA, FedRAMP compliance",
        "Understanding of NIST cybersecurity frameworks",
        "Experience with government procurement processes",
        "Strong documentation and communication skills"
      ],
      benefits: ["Government training programs", "Professional certifications", "DC area networking", "Growth opportunities"],
      icon: <Award className="w-6 h-6 text-orange-400" />
    },
    {
      id: "data-engineer",
      title: "Senior Data Engineer",
      department: "Engineering",
      location: "Remote / Seattle, WA",
      type: "Full-time",
      salary: "$140,000 - $180,000", 
      description: "Design and implement data pipelines for processing cybersecurity telemetry, threat intelligence, and compliance reporting data at enterprise scale.",
      requirements: [
        "5+ years data engineering experience",
        "Expert knowledge of data pipelines and streaming systems",
        "Experience with big data technologies (Spark, Kafka, Elasticsearch)",
        "Strong SQL and Python programming skills",
        "Experience with cybersecurity data and threat intelligence"
      ],
      benefits: ["Data platform access", "Conference speaking opportunities", "Research collaboration", "Innovation time"],
      icon: <Database className="w-6 h-6 text-red-400" />
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-red-400" />,
      title: "Health & Wellness",
      description: "Comprehensive medical, dental, and vision insurance plus wellness programs"
    },
    {
      icon: <Laptop className="w-8 h-8 text-blue-400" />, 
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible schedules and home office stipends"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-green-400" />,
      title: "Learning & Development", 
      description: "Professional development budget, conference attendance, and certification support"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-yellow-400" />,
      title: "Competitive Compensation",
      description: "Market-leading salaries, equity packages, and performance bonuses"
    },
    {
      icon: <Coffee className="w-8 h-8 text-orange-400" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO, sabbatical programs, and mental health support"
    },
    {
      icon: <Award className="w-8 h-8 text-purple-400" />,
      title: "Mission-Driven Work",
      description: "Protect critical infrastructure for education and government organizations"
    }
  ];

  const companyValues = [
    {
      title: "Innovation First",
      description: "We push the boundaries of AI and cybersecurity to stay ahead of evolving threats",
      icon: <Brain className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Security Mindset",
      description: "Security considerations are embedded in everything we do, from code to culture", 
      icon: <Shield className="w-6 h-6 text-green-400" />
    },
    {
      title: "Customer Impact",
      description: "We're passionate about protecting the organizations that serve our communities",
      icon: <Heart className="w-6 h-6 text-red-400" />
    },
    {
      title: "Collaborative Excellence",
      description: "Great results come from diverse teams working together toward common goals",
      icon: <Users className="w-6 h-6 text-blue-400" />
    }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span>Careers at CyberSecured AI</span>
                <Users className="w-8 h-8 text-blue-400" />
                <Building className="w-8 h-8 text-green-400" />
              </h1>
              <p className="text-gray-400">Join our mission to protect education and government organizations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Shape the Future of Cybersecurity</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              At CyberSecured AI, you'll work on cutting-edge AI and cybersecurity technologies that protect 
              critical infrastructure for schools, universities, and government agencies across the country. 
              Join a team of passionate experts making a real impact on national security and educational safety.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">50+</div>
                <div className="text-gray-400">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">100%</div>
                <div className="text-gray-400">Remote-Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">$50M</div>
                <div className="text-gray-400">Series A Funding</div>
              </div>
            </div>
          </section>

          {/* Company Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyValues.map((value, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Open Positions</h2>
            <div className="space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          {job.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl text-white">{job.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                              {job.department}
                            </Badge>
                            <Badge variant="outline" className="text-gray-300 border-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {job.location}
                            </Badge>
                            <Badge variant="outline" className="text-blue-400 border-blue-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {job.type}
                            </Badge>
                            {job.salary && (
                              <Badge variant="outline" className="text-green-400 border-green-500">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {job.salary}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-cyan-600 hover:bg-cyan-700">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">{job.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-white mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-white mb-3">Additional Benefits:</h4>
                        <ul className="space-y-2">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Why Work at CyberSecured AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Culture & Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team & Culture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Diverse & Inclusive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    Our team includes cybersecurity experts, AI researchers, former government officials, 
                    and education technology specialists from diverse backgrounds. We believe different 
                    perspectives make our security solutions stronger.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Equal opportunity employer</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Mentorship and sponsorship programs</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Employee resource groups</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Growth & Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">
                    We invest heavily in our team's professional development through conferences, 
                    certifications, internal training programs, and opportunities to contribute to 
                    open source projects and research publications.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" />$5K annual learning budget</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" />Conference speaking opportunities</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-blue-400 mr-2" />Internal tech talks and knowledge sharing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 cyber-glow">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Mission?</h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Don't see the perfect role? We're always looking for exceptional talent. 
                  Send us your resume and let us know how you'd like to contribute to our mission.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                    Send General Application
                  </Button>
                  <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8">
                    View All Open Positions
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  Equal opportunity employer committed to diversity and inclusion
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      </div>
    </MarketingLayout>
  );
}