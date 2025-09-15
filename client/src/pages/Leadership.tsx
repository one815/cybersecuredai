import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
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
} from "@/components/LazyCustomIcons";
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
import { SiLinkedin } from "react-icons/si";

// Import team member photos from attached assets
import aaliaZehadImg from "@assets/Aalia_1757954427631.webp";
import asalahMahmoudImg from "@assets/Asalah_1757954427633.webp";
import brookeHoldenImg from "@assets/Brooke Holden_1757954427634.webp";
import camiliaAndersonImg from "@assets/Camilia Anderson_1757954427634.webp";
import ceciliaSimpsonImg from "@assets/Cecilia_1757954427634.webp";
import hunterAndersonImg from "@assets/Hunter_1757954427636.webp";
import lucasLopezImg from "@assets/Lucas_1757954427638.webp";
import markIbrahimImg from "@assets/Mark_1757954427638.webp";

// Import additional team member photos from attached assets
import sarahChenImg from "@assets/Sarah Chen_1757954437932.webp";

// Placeholders for team members without photos yet  
const gregoriaNwagmeImg = "/api/placeholder/150/150";
const brookeCarlisleImg = "/api/placeholder/150/150";
const maureenDizonImg = "/api/placeholder/150/150";

// Import certification and award images
const risingStarAwardImg = "/api/placeholder/100/100";
const bcbsAwardImg = "/api/placeholder/100/100";
const achieversLeagueAwardImg = "/api/placeholder/100/100";

// Import certification images
const azureSecurityCertImg = "/api/placeholder/200/150";
const googleCloudCertImg = "/api/placeholder/200/150";
const pmpCertImg = "/api/placeholder/200/150";
const azureDeveloperCertImg = "/api/placeholder/200/150";
// Use placeholder for missing certifications
const vmwareCertImg = "/api/placeholder/150/150";
const digitalMarketingCertImg = "/api/placeholder/150/150";

// Import actual certification document images
const azureSecurityPreviewImg = "/api/placeholder/400/300";
const googleCloudPreviewImg = "/api/placeholder/400/300";  
const vmwarePreviewImg = "/api/placeholder/400/300";
const pmpPreviewImg = "/api/placeholder/400/300";
const azureDeveloperPreviewImg = "/api/placeholder/400/300";
const digitalMarketingPreviewImg = "/api/placeholder/400/300";

// Certificate badge images replaced with placeholders for build optimization
const pmpCertImage = "/api/placeholder/150/150";
const azureSecurityCertImage = "/api/placeholder/150/150";
const azureDeveloperCertImage = "/api/placeholder/150/150";
const googleCloudCertImage = "/api/placeholder/150/150";
const vmwareCertImage = "/api/placeholder/150/150";
const digitalMarketingCertImage = "/api/placeholder/150/150";

// Create PDF preview placeholder since PDFs can't be displayed as images directly
const createCertPreview = (title: string) => {
  return "data:image/svg+xml;base64," + btoa(`
<svg width="120" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="certGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="120" height="80" fill="url(#certGradient)" stroke="#3b82f6" stroke-width="1" rx="4"/>
  <rect x="5" y="5" width="110" height="70" fill="none" stroke="#60a5fa" stroke-width="0.5" stroke-dasharray="2,2" rx="2"/>
  <text x="60" y="25" text-anchor="middle" fill="#60a5fa" font-family="Arial, sans-serif" font-size="8" font-weight="bold">CERTIFICATION</text>
  <text x="60" y="45" text-anchor="middle" fill="#93c5fd" font-family="Arial, sans-serif" font-size="6">${title}</text>
  <circle cx="60" cy="65" r="4" fill="#3b82f6" opacity="0.8"/>
  <text x="60" y="67" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="5">PDF</text>
</svg>
  `);
};

export default function Leadership() {
  // Camtivates team adapted for CyberSecured AI
  const executiveTeam = [
    {
      name: "Camilia Anderson",
      title: "Chief Executive Officer & Founder",
      certifications: ["PMP", "MC Azure AI Engineer", "MC Azure Security Engineer", "Microsoft Azure Developer", "Google Cloud Security Engineer", "VMware Certified Pro", "CD Marketing Professional"],
      experience: "17+ Years",
      specialties: ["AI/ML Expert", "Strategic Cybersecurity", "Executive Leadership"],
      location: "Aledo, TX",
      email: "info@cybersecuredai.com",
      linkedin: "https://linkedin.com/in/camilia-anderson",
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
      image: camiliaAndersonImg
    }
  ];

  const distinguishedLeadership = [
    {
      name: "Dr. Sarah Chen",
      title: "Head of AI Security Strategy",
      subtitle: "Former Google AI/ML Security Researcher & Stanford AI Laboratory Director",
      bio: "Dr. Chen brings world-class AI security expertise from Google's cutting-edge research division to revolutionize threat detection and predictive analytics for educational cybersecurity at CyberSecured AI. Her pioneering research in adversarial machine learning and AI security frameworks has established new industry standards for autonomous threat detection systems.",
      education: "Ph.D. Computer Science - Artificial Intelligence, Stanford University; MS Machine Learning, Carnegie Mellon University; BS Computer Science, MIT",
      experience: "16+ years AI security research, Former Principal Research Scientist at Google AI, Former Director of Stanford AI Security Laboratory",
      certifications: ["Certified Information Systems Security Professional (CISSP)", "Google Cloud Professional Machine Learning Engineer", "AWS Certified Machine Learning - Specialty", "Certified Artificial Intelligence Professional (CAIP)"],
      clearance: "Available upon request",
      projectReferences: [
        "AI security research for educational technology environments",
        "Privacy-preserving machine learning for educational data analysis",
        "Advanced threat detection systems for K-12 cybersecurity",
        "Educational AI security frameworks and compliance research"
      ],
      specialties: ["Machine Learning Security", "AI Threat Research", "Strategic AI Implementation", "Adversarial AI Defense"],
      email: "info@cybersecuredai.com",
      linkedin: "https://linkedin.com/in/dr-sarah-chen",
      image: sarahChenImg
    },
    {
      name: "Hunter Anderson",
      title: "Chief Technology Officer",
      subtitle: "Cybersecurity Systems Architect & Former NSA Senior Engineer",
      bio: "Hunter leads CyberSecured AI's technical architecture and platform development with extensive experience in government-grade cybersecurity systems. His expertise in distributed security frameworks, real-time threat analysis, and high-availability infrastructure drives our platform's enterprise capabilities. Hunter's background in classified defense systems and large-scale security implementations ensures our technology meets the most demanding federal security requirements.",
      education: "MS Computer Science - Cybersecurity, Carnegie Mellon University; BS Computer Engineering, Virginia Tech",
      experience: "14+ years cybersecurity engineering, Former Senior Systems Engineer at NSA, Former Principal Architect at Raytheon Technologies",
      certifications: ["CISSP", "CISM", "AWS Solutions Architect Professional", "SANS GIAC Security Expert (GSE)"],
      clearance: "Available upon request",
      projectReferences: [
        "Federal cybersecurity program support and implementation",
        "Enterprise security architecture for critical infrastructure",
        "NIST cybersecurity framework implementation and compliance",
        "Educational technology security architecture and planning"
      ],
      specialties: ["Enterprise Security Architecture", "Critical Infrastructure Protection", "Real-time Threat Detection", "Federal Compliance Systems"],
      email: "info@cybersecuredai.com",
      linkedin: "https://linkedin.com/in/hunter-anderson-cto",
      image: hunterAndersonImg
    },
    {
      name: "Mark Ibrahim",
      title: "Chief AI Security Research Officer",
      subtitle: "Fundamental AI Research Scientist, Meta AI - Privacy-Preserving Machine Learning Expert",
      bio: "Mark brings cutting-edge AI security and privacy-preserving machine learning expertise from Meta AI to CyberSecured AI's research initiatives. With extensive work on encrypted data processing and privacy-preserving ML, he leads our advanced AI security research and development of privacy-preserving cybersecurity systems.",
      education: "Ph.D. Computer Science - Machine Learning, Advanced AI Research Specialization",
      experience: "8+ years AI research at Meta AI (formerly Facebook AI Research), specializing in privacy-preserving ML and encrypted data processing",
      certifications: ["Verified Google Scholar Researcher", "PyCon US Speaker", "NeurIPS Workshop Presenter", "ICML Tutorial Instructor"],
      projectReferences: [
        "Privacy-preserving machine learning research and development",
        "Educational AI security research and academic collaboration",
        "AI security conference presentations and workshops",
        "Machine learning security tutorials and educational content",
        "Privacy-preserving cybersecurity systems for educational institutions"
      ],
      specialties: ["Privacy-Preserving Machine Learning", "Encrypted Data Processing", "Self-Supervised Learning", "Robust AI Systems"],
      email: "info@cybersecuredai.com",
      linkedin: "https://linkedin.com/in/marksibrahim",
      image: markIbrahimImg
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
      email: "info@cybersecuredai.com",
      linkedin: "https://linkedin.com/in/aalia-zehad",
      image: aaliaZehadImg
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
      image: lucasLopezImg
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
      image: asalahMahmoudImg
    },
    {
      name: "Cecilia Simpson",
      title: "Cybersecurity Success Manager",
      experience: "8+ Years",
      education: "Business Administration - Customer Success", 
      highlights: [
        "Ensuring exceptional client cybersecurity experience and satisfaction",
        "Managing client security onboarding and success workflows",
        "Building long-term cybersecurity relationships and driving client retention"
      ],
      image: ceciliaSimpsonImg
    }
  ];


  // Camilia Anderson's Professional Certifications
  const camiliasCertifications = [
    {
      title: "Project Management Professional (PMP)®",
      organization: "Project Management Institute",
      description: "Global certification for project management excellence and organizational objective achievement.",
      category: "Project Management",
      image: pmpCertImage,
      documentUrl: pmpPreviewImg,
      isDocument: true
    },
    {
      title: "Microsoft Certified: Azure Security Engineer Associate", 
      organization: "Microsoft",
      validUntil: "March 03, 2026",
      description: "Advanced certification in Azure security architecture and implementation.",
      category: "Cloud Security",
      image: azureSecurityCertImage,
      documentUrl: azureSecurityPreviewImg,
      isDocument: true
    },
    {
      title: "Microsoft Certified: Azure Developer Associate",
      organization: "Microsoft", 
      validUntil: "May 24, 2026",
      description: "Expert-level Azure development and cloud solution architecture.",
      category: "Cloud Development",
      image: azureDeveloperCertImage,
      documentUrl: azureDeveloperPreviewImg,
      isDocument: true
    },
    {
      title: "Google Cloud Certified Professional Cloud Security Engineer",
      organization: "Google Cloud",
      validUntil: "August 05, 2026", 
      certificationId: "90zcfz",
      description: "Advanced certification in Google Cloud security architecture and best practices.",
      category: "Cloud Security",
      image: googleCloudCertImage,
      documentUrl: googleCloudPreviewImg,
      isDocument: true
    },
    {
      title: "VMware Certified Professional - Network Virtualization 2021",
      organization: "VMware",
      description: "Professional certification in network virtualization and VMware infrastructure.",
      category: "Network Infrastructure",
      image: vmwareCertImage,
      documentUrl: vmwarePreviewImg,
      isDocument: true
    },
    {
      title: "Certified Digital Marketing Professional",
      organization: "Digital Marketing Institute / American Marketing Association",
      graduateNo: "IE-DMI287777",
      description: "AMA Professional Certified Marketer (PCM) in Digital Marketing with SCQF accreditation.",
      category: "Marketing & Strategy",
      image: digitalMarketingCertImage,
      documentUrl: digitalMarketingPreviewImg,
      isDocument: true
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
                Leadership Team
              </Badge>
              <h1 className="text-5xl font-bold mb-6 text-white">
                Executive Leadership
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Visionary leadership driving cybersecurity innovation with proven expertise and measurable results.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Our expert team combines decades of cybersecurity expertise with cutting-edge AI innovation to protect educational institutions and government agencies worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Leadership */}
        <div className="py-20 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-white">Meet Our Founder & CEO</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Meet our founder and CEO who drives strategic cybersecurity innovation with proven expertise.
              </p>
            </div>

            {executiveTeam.map((leader, index) => (
              <Card key={index} className="bg-midnight-800/50 border-midnight-700 mb-12 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-64 h-64">
                        <img 
                          src={leader.image} 
                          alt={leader.name}
                          className="w-full h-full object-contain"
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
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 flex justify-center items-start">
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                      <p className="text-spring-400 font-semibold mb-1">{leader.title}</p>
                      <p className="text-cyber-blue-400 mb-4">{leader.subtitle}</p>
                      
                      {/* Education and Experience for new members */}
                      {leader.education && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-1">Education</h4>
                          <p className="text-gray-300 text-sm">{leader.education}</p>
                        </div>
                      )}
                      
                      {leader.experience && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-1">Experience</h4>
                          <p className="text-gray-300 text-sm">{leader.experience}</p>
                        </div>
                      )}
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">{leader.bio}</p>
                      
                      {/* Certifications */}
                      {leader.certifications && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-2">Certifications</h4>
                          <div className="flex flex-wrap gap-2">
                            {leader.certifications.map((cert, certIndex) => (
                              <Badge key={certIndex} className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Security Clearance */}
                      {leader.clearance && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-1">Security Clearance</h4>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            {leader.clearance}
                          </Badge>
                        </div>
                      )}
                      
                      {/* Project References */}
                      {leader.projectReferences && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-2">Project References</h4>
                          <div className="space-y-1">
                            {leader.projectReferences.map((project, projectIndex) => (
                              <div key={projectIndex} className="flex items-start gap-2">
                                <Enhanced4DCheckCircleIcon className="glass-icon w-4 h-4 mt-0.5 text-spring-400" size={16} />
                                <span className="text-gray-300 text-sm">{project}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Awards */}
                      {leader.awards && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-white mb-2">Awards & Recognition</h4>
                          <div className="space-y-1">
                            {leader.awards.map((award, awardIndex) => (
                              <div key={awardIndex} className="flex items-start gap-2">
                                <Enhanced4DStarIcon className="glass-icon w-4 h-4 mt-0.5 text-spring-400" size={16} />
                                <span className="text-gray-300 text-sm">{award}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Specialties */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2">Specialties</h4>
                        <div className="flex flex-wrap gap-2">
                          {leader.specialties.map((specialty, specIndex) => (
                            <Badge key={specIndex} variant="outline" className="border-spring-400/30 text-spring-400 bg-spring-400/10">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
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
                  <div className="relative flex justify-center items-center p-6 bg-midnight-900/30">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-64 h-64 object-contain group-hover:scale-105 transition-transform duration-300"
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

        {/* Camilia Anderson's Professional Certifications */}
        <div className="py-20 bg-midnight-950/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge className="bg-spring-500/20 text-spring-400 border-spring-500/30 mb-6">
                <Enhanced4DStarIcon className="glass-icon w-4 h-4 mr-2" size={16} />
                Professional Excellence
              </Badge>
              <h2 className="text-4xl font-bold mb-4 text-white">Camilia Anderson's Professional Certifications</h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                A comprehensive portfolio of industry-leading certifications spanning cybersecurity, cloud architecture, AI development, and strategic project management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {camiliasCertifications.map((cert, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="bg-midnight-800/40 border-midnight-600 hover:border-spring-400/50 transition-all duration-300 group cursor-pointer" data-testid={`cert-card-${index}`}>
                      <div className="relative p-4 bg-midnight-900/30">
                        <div className="flex justify-center items-center h-16 mb-4 overflow-hidden rounded-md">
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute top-2 right-2">
                          <Enhanced4DEyeIcon className="glass-icon w-5 h-5 text-spring-400" size={20} />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="outline" className="bg-spring-500/10 border-spring-400/30 text-spring-400">
                            {cert.category}
                          </Badge>
                          {cert.validUntil && (
                            <Badge className="bg-cyber-blue-500/20 text-cyber-blue-400 border-cyber-blue-500/30 text-xs">
                              Valid until {cert.validUntil}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-spring-400 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-spring-400 font-semibold text-sm mb-3">{cert.organization}</p>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">{cert.description}</p>
                        {cert.certificationId && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Enhanced4DCheckCircleIcon className="glass-icon w-3 h-3" size={12} />
                            <span>ID: {cert.certificationId}</span>
                          </div>
                        )}
                        {cert.graduateNo && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Enhanced4DCheckCircleIcon className="glass-icon w-3 h-3" size={12} />
                            <span>Graduate #: {cert.graduateNo}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-midnight-800 border-cyber-blue-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white">
                        {cert.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-6 p-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-spring-400 mb-2">Organization</h4>
                          <p className="text-white">{cert.organization}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-spring-400 mb-2">Category</h4>
                          <Badge className="bg-cyber-blue-500/20 text-cyber-blue-400 border-cyber-blue-500/30">
                            {cert.category}
                          </Badge>
                        </div>
                        {cert.validUntil && (
                          <div>
                            <h4 className="text-lg font-semibold text-spring-400 mb-2">Valid Until</h4>
                            <p className="text-white">{cert.validUntil}</p>
                          </div>
                        )}
                        {cert.certificationId && (
                          <div>
                            <h4 className="text-lg font-semibold text-spring-400 mb-2">Certification ID</h4>
                            <p className="text-white font-mono">{cert.certificationId}</p>
                          </div>
                        )}
                        {cert.graduateNo && (
                          <div>
                            <h4 className="text-lg font-semibold text-spring-400 mb-2">Graduate Number</h4>
                            <p className="text-white font-mono">{cert.graduateNo}</p>
                          </div>
                        )}
                        <div>
                          <h4 className="text-lg font-semibold text-spring-400 mb-2">Description</h4>
                          <p className="text-gray-300 leading-relaxed">{cert.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="w-full bg-white/5 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px]">
                          <img 
                            src={cert.image} 
                            alt={cert.title}
                            className="max-w-full max-h-64 object-contain rounded-lg shadow-lg hover:scale-110 transition-transform duration-300 cursor-zoom-in border border-spring-400/30"
                            onClick={() => window.open(cert.documentUrl || cert.image, '_blank')}
                            data-testid={`cert-zoom-image-${index}`}
                          />
                        </div>
                        <Button 
                          onClick={() => window.open(cert.documentUrl || cert.image, '_blank')}
                          className="bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold w-full"
                          data-testid={`cert-view-full-${index}`}
                        >
                          <Enhanced4DExternalLinkIcon className="glass-icon w-4 h-4 mr-2" size={16} />
                          {cert.isDocument ? 'View PDF Certificate' : 'View Full Size'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-spring-900/20 to-cyber-blue-900/20 border-spring-500/30 inline-block">
                <CardContent className="p-8">
                  <Enhanced4DStarIcon className="glass-icon mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-white mb-2">Continuous Professional Development</h3>
                  <p className="text-gray-300 max-w-2xl">
                    Camilia maintains her expertise through ongoing certification renewals and advanced training programs, ensuring CyberSecured AI stays at the forefront of cybersecurity innovation.
                  </p>
                </CardContent>
              </Card>
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