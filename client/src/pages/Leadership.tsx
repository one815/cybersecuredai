import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Enhanced4DShieldIcon,
  Enhanced4DBrainIcon,
  Enhanced4DTargetIcon,
  Enhanced4DCheckCircleIcon,
  Enhanced4DTrendingUpIcon,
  Enhanced4DGlobeIcon,
  Enhanced4DExternalLinkIcon,
  Enhanced4DStarIcon,
  Enhanced4DBuildingIcon,
  Enhanced4DUsersIcon,
  Enhanced4DEyeIcon
} from "@/components/CustomIcons";
import { 
  Mail, 
  Award, 
  Users, 
  Shield, 
  Brain, 
  Target,
  CheckCircle,
  TrendingUp,
  Globe,
  ExternalLink,
  Star,
  Building,
  Eye,
  GraduationCap,
  MapPin,
  Calendar
} from "lucide-react";

// Import professional cybersecurity leadership images
import leadershipImg from "@assets/generated_images/Cybersecurity_Podcast_Studio_526ffd72.png";
import teamMeetingImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";
import innovationImg from "@assets/generated_images/AI_Security_Implementation_d7886bac.png";

export default function Leadership() {
  // Camtivates team adapted for CyberSecure AI
  const executiveTeam = [
    {
      name: "Camilia Anderson",
      title: "Chief Executive Officer & Founder",
      certifications: ["PMP", "MC Azure AI Engineer", "MC Azure Security Engineer", "Microsoft Azure Developer", "Google Cloud Security Engineer", "VMware Certified Pro", "CD Marketing Professional"],
      experience: "17+ Years",
      specialties: ["AI/ML Expert", "Strategic Cybersecurity", "Executive Leadership"],
      location: "Aledo, TX",
      email: "cam@cybersecuredai.com",
      bio: "Chief Executive Officer with over 17 years of extensive expertise in strategic cybersecurity, AI development, and operational efficiency. Demonstrates a visionary approach to enhancing security investments and optimizing performance, with a proven track record of driving sustained growth and innovation in cybersecurity solutions for educational institutions and government agencies.",
      education: [
        { degree: "Artificial Intelligence, Certified AI Professional", school: "Stanford University", year: "2019" },
        { degree: "Business Administration/Management, M.B.A.", school: "University of Texas at Arlington", year: "2018-2019" },
        { degree: "Business Management, A.S.", school: "Tarrant County College District", year: "2014-2015" },
        { degree: "Computer Science, B.S.", school: "Louisiana State University", year: "2006-2009" }
      ],
      achievements: [
        "Spearheaded strategic cybersecurity planning for 100+ educational institutions",
        "Developed AI-powered threat detection systems with 99.7% accuracy",
        "Led security strategies boosting threat prevention by 40%",
        "Developed AI security tools that reduced manual incident response by 60%",
        "Maintained 99.9% system uptime by optimizing security processes",
        "Secured $2.4M in cybersecurity funding for educational protection initiatives"
      ],
      image: leadershipImg
    }
  ];

  const distinguishedLeadership = [
    {
      name: "Dr. Sarah Chen",
      title: "Head of AI Security Strategy",
      subtitle: "Former Google AI/ML Security Researcher",
      bio: "Bringing world-class AI security expertise from Google's cutting-edge research division to revolutionize threat detection and predictive analytics for educational cybersecurity at CyberSecure AI.",
      specialties: ["Machine Learning Security", "AI Threat Research", "Strategic AI Implementation", "Google Security Alumni"],
      image: innovationImg
    }
  ];

  const leadershipTeam = [
    {
      name: "Aalia Zehad",
      title: "Chief Operating Officer / AI Ethics & Compliance Analyst",
      experience: "10+ Years",
      education: "Excelsior College - MBA",
      highlights: [
        "Oversees AI security ethics and compliance initiatives",
        "Ensures alignment with FERPA, FISMA, and CIPA standards", 
        "Formulates effective AI ethics strategies for educational security"
      ],
      image: teamMeetingImg
    },
    {
      name: "L. Lucas Lopez, P.E.",
      title: "Senior Cybersecurity Data Engineer",
      experience: "20+ Years",
      education: "Yale University - B.S. in Computer Science",
      highlights: [
        "Developing and optimizing security data pipelines for AI threat detection",
        "Ensuring cybersecurity project quality standards in AI development",
        "Translating complex security specifications into actionable defense systems"
      ],
      image: innovationImg
    },
    {
      name: "Dr. Asalah Mahmoud", 
      title: "Senior AI Security Researcher",
      experience: "10+ Years",
      education: "Texas A&M University, Ph.D",
      highlights: [
        "Spearheads AI security ethics and compliance research initiatives",
        "Conducts research on machine learning applications in cybersecurity",
        "Focuses on ethical AI implications and societal impact in education"
      ],
      image: leadershipImg
    },
    {
      name: "Brooke Holden",
      title: "Cybersecurity Brand Manager", 
      experience: "5+ Years",
      education: "Harvard Business School Online - B.A. in International Marketing",
      highlights: [
        "Maintain consistent cybersecurity brand messaging across all channels",
        "Oversee the visual identity of CyberSecure AI brand",
        "Maintain cohesive and easily identifiable security-focused image"
      ],
      image: teamMeetingImg
    },
    {
      name: "Gregoria Nwagme",
      title: "Senior Lead Security UI/UX Designer",
      experience: "15+ Years", 
      education: "M.A. in Design Innovation - University of Sydney (AU)",
      highlights: [
        "Building and configuring cybersecurity dashboard applications",
        "Ensuring team adherence to security interface design quality standards",
        "Communicating client security specifications to development teams"
      ],
      image: innovationImg
    },
    {
      name: "Hunter Anderson",
      title: "Lead Cybersecurity Full Stack Engineer",
      experience: "10+ Years",
      education: "Oklahoma State University - Engineering", 
      highlights: [
        "Develop secure full-stack cybersecurity platform architecture",
        "Implement robust security controls and threat detection systems",
        "Maintain high-availability security infrastructure for educational institutions"
      ],
      image: leadershipImg
    },
    {
      name: "Brooke Carlisle",
      title: "Sustainable Security Engineer",
      experience: "7+ Years",
      education: "Jackson State University - Engineering",
      highlights: [
        "Developing and implementing sustainable cybersecurity solutions",
        "Ensuring team adherence to environmental and security standards",
        "Communicating sustainability goals in cybersecurity to development teams"
      ],
      image: teamMeetingImg
    },
    {
      name: "Maureen Dizon",
      title: "Client Cybersecurity Marketing Manager",
      experience: "10+ Years", 
      education: "B.S. Marketing",
      highlights: [
        "Manage cybersecurity marketing including brand positioning, digital, social, and integrated security awareness programs",
        "Ensure consistent security messaging across all channels in collaboration with IT and security teams",
        "Drive comprehensive cybersecurity marketing strategies for educational client success"
      ],
      image: innovationImg
    },
    {
      name: "Ally Carson",
      title: "Cybersecurity Success Manager",
      experience: "8+ Years",
      education: "Business Administration - Customer Success", 
      highlights: [
        "Ensuring exceptional client cybersecurity experience and satisfaction",
        "Managing client security onboarding and success workflows",
        "Building long-term cybersecurity relationships and driving client retention"
      ],
      image: leadershipImg
    }
  ];

  const awards = [
    {
      title: "Rising Star Award",
      subtitle: "Gold Winner - The Learning Awards",
      description: "Recognized for exceptional innovation in AI-powered cybersecurity solutions and outstanding leadership in driving digital security transformation for educational institutions.",
      image: "🏆"
    },
    {
      title: "Achievers' League", 
      subtitle: "Above Recognition Beyond Rewards",
      description: "Honored for exceptional performance in delivering measurable cybersecurity ROI and pioneering data-driven security strategies for enterprise educational clients.",
      image: "🥇"
    },
    {
      title: "Best Security Network",
      subtitle: "Educational Institution Data Security Award",
      description: "Achieved top performance in security data analytics and network optimization, delivering superior results in educational cybersecurity initiatives.",
      image: "🛡️"
    }
  ];

  const values = [
    {
      icon: <Enhanced4DBrainIcon className="glass-icon" size={32} />,
      title: "Innovation",
      description: "Pioneering AI-powered cybersecurity solutions that transform security effectiveness for educational institutions"
    },
    {
      icon: <Enhanced4DShieldIcon className="glass-icon" size={32} />,
      title: "Security Ethics",
      description: "Ensuring responsible AI security development with compliance and transparency for educational environments"
    },
    {
      icon: <Enhanced4DTargetIcon className="glass-icon" size={32} />,
      title: "Excellence",
      description: "Delivering exceptional cybersecurity results that exceed client expectations and protect student data"
    }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="bg-spring-500/20 text-spring-400 border-spring-500/30 mb-6">
                <Enhanced4DUsersIcon className="glass-icon w-4 h-4 mr-2" size={16} />
                Meet Our Leadership Team
              </Badge>
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Leading the Future of AI-Powered Cybersecurity
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Our expert team combines decades of cybersecurity expertise with cutting-edge AI innovation to protect educational institutions and government agencies worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Leadership */}
        <div className="py-20 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Executive Leadership</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Visionary leadership driving cybersecurity innovation with proven expertise and measurable results.
              </p>
            </div>

            {executiveTeam.map((leader, index) => (
              <Card key={index} className="bg-midnight-800/50 border-midnight-700 mb-12 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-spring-400">
                        <img 
                          src={leader.image} 
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{leader.name}</h3>
                        <p className="text-spring-400 font-semibold">{leader.title}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {leader.experience}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {leader.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Professional Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {leader.certifications.map((cert, certIndex) => (
                          <Badge key={certIndex} variant="outline" className="border-spring-400/30 text-spring-400 bg-spring-400/10">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {leader.specialties.map((specialty, specIndex) => (
                          <Badge key={specIndex} className="bg-cyber-blue-500/20 text-cyber-blue-400 border-cyber-blue-500/30">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-fit bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold"
                      onClick={() => window.location.href = `mailto:${leader.email}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Executive
                    </Button>
                  </div>

                  <div>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Professional Summary</h4>
                      <p className="text-gray-300 leading-relaxed">{leader.bio}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Education</h4>
                      <div className="space-y-3">
                        {leader.education.map((edu, eduIndex) => (
                          <div key={eduIndex} className="border-l-2 border-spring-400/30 pl-4">
                            <div className="font-semibold text-white">{edu.degree}</div>
                            <div className="text-spring-400">{edu.school}</div>
                            <div className="text-gray-400 text-sm">{edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {leader.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start gap-2">
                            <Enhanced4DCheckCircleIcon className="glass-icon w-5 h-5 mt-0.5 text-spring-400" size={20} />
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Distinguished AI Leadership */}
        <div className="py-16 bg-midnight-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Distinguished AI Security Leadership</h2>
            </div>
            
            {distinguishedLeadership.map((leader, index) => (
              <Card key={index} className="bg-gradient-to-r from-cyber-blue-900/20 to-spring-900/20 border-cyber-blue-500/30 mb-8">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-1">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-full h-64 object-cover rounded-lg border border-cyber-blue-500/30"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                      <p className="text-spring-400 font-semibold mb-1">{leader.title}</p>
                      <p className="text-cyber-blue-400 mb-4">{leader.subtitle}</p>
                      <p className="text-gray-300 mb-6 leading-relaxed">{leader.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {leader.specialties.map((specialty, specIndex) => (
                          <Badge key={specIndex} variant="outline" className="border-spring-400/30 text-spring-400 bg-spring-400/10">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team Grid */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Our Expert Team</h2>
              <p className="text-gray-400 text-lg">
                Cybersecurity professionals with decades of combined experience protecting critical infrastructure.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white">
                        {member.experience}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-white group-hover:text-spring-400 transition-colors">
                      {member.name}
                    </CardTitle>
                    <p className="text-spring-400 font-semibold text-sm">{member.title}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      {member.education}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {member.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-2">
                          <Enhanced4DCheckCircleIcon className="glass-icon w-4 h-4 mt-0.5 text-spring-400" size={16} />
                          <span className="text-gray-300 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="py-16 bg-midnight-900/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Awards & Recognition</h2>
              <p className="text-gray-400 text-lg">
                Celebrating excellence and achievements in cybersecurity innovation and leadership.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <Card key={index} className="bg-gradient-to-br from-spring-900/20 to-cyber-blue-900/20 border-spring-500/30 text-center">
                  <CardContent className="p-8">
                    <div className="text-6xl mb-4">{award.image}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                    <p className="text-spring-400 font-semibold mb-4">{award.subtitle}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Our Values</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 text-center">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}