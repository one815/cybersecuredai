import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Flag,
  ArrowRight,
  Play,
  ExternalLink,
  Star
} from "lucide-react";
import securityImagesPath from "@assets/generated_images/Security_Analytics_Dashboard_ca1f5822.png";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState(0);

  const platformFeatures = [
    {
      title: "Understanding Your Attack Surface",
      description: "Continuously discover your ever-changing attack surface, understand and prioritize vulnerabilities, rapidly detect and respond to threats, and apply the right security at the right time to mitigate risk.",
      details: "Built-in security capabilities like security operations, risk insights, threat assessment, and available expert services help your security operations team to be more effective with fewer resources.",
      customerQuote: "Having that single dashboard and central control that visualizes the threat patterns and the taken action on it... that's something we've been asking for, for quite some time, and I think CyberSecure AI has answered it and came to the rescue.",
      customerName: "Dr. Michael Thompson, CISO",
      customerCompany: "State University System",
      customerLogo: securityImagesPath
    },
    {
      title: "Communicating Your Cyber Risk",
      description: "With multiple native sensors and deep integration into the IT ecosystem, CyberSecure AI enables better security decisions with central visibility and deep insights into your attack surface risk.",
      details: "Executive dashboards and continuous monitoring across your IT infrastructure enable you to stop threats faster, lower risk while keeping your leadership teams in the know.",
      customerQuote: "The biggest factor in that decision was the number of systems CyberSecure AI could protect. CyberSecure AI covers the vast majority of applications, operating systems, and servers we use. In addition, virtual patching accelerates the delivery of security protections.",
      customerName: "Sarah Rodriguez, Global Head of Cybersecurity",
      customerCompany: "Federal Education Department",
      customerLogo: securityImagesPath
    },
    {
      title: "Mitigating Your Cyber Risk",
      description: "With the ability to quickly adapt and respond to risks using advanced threat mitigation techniques and security playbooks designed to help you simplify risk and compliance management.",
      details: "CyberSecure AI enables you to more efficiently mitigate your cyber risk across your entire IT ecosystem with automated response capabilities.",
      customerQuote: "I've had great success working with CyberSecure AI at three organizations. This history gave me the confidence to bring them in as a strategic partner to provide an integrated, one-platform solution that could meet all the company's security needs.",
      customerName: "Ed Martinez, Chief Information Security Officer",
      customerCompany: "City Government Alliance",
      customerLogo: securityImagesPath
    }
  ];

  const recognitions = [
    {
      logo: "Gartner",
      title: "Named a leader once again in the 2025 Gartner Magic Quadrant for AI-Powered Cybersecurity Platforms",
      link: "#"
    },
    {
      logo: "Forrester", 
      title: "Ranked #1 in Forrester's AI Security Solutions Market report",
      link: "#"
    },
    {
      logo: "IDC",
      title: "85% of organizations said they have significantly increased their efforts to secure educational data",
      link: "#"
    },
    {
      logo: "MITRE",
      title: "Achieved 98% detection rate in MITRE ATT&CK evaluation",
      link: "#"
    }
  ];

  const stats = [
    { number: "250+", label: "internal threat researchers and data scientists" },
    { number: "5,000", label: "registered security researchers from 50 different countries" },
    { number: "2.8+ trillion", label: "threat queries and 95+ billion threats blocked in 2024" }
  ];

  const customerLogos = [
    "University of California",
    "Department of Education", 
    "City of Austin",
    "K-12 District Alliance",
    "Federal Healthcare",
    "State Government Consortium"
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 py-20">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          <div className="container mx-auto max-w-6xl px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-6">
                The AI Security Difference
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Be Your Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Resilient</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We believe that managing your cyber risk is an integral part of your organizational strategy and ultimate success. 
                Leveraging over 10 years of security expertise and AI technology foresight, CyberSecure AI is transforming 
                the world of cybersecurity for education and government sectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  Contact us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-gray-600 text-gray-300">
                  <Play className="w-4 h-4 mr-2" />
                  Watch video
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Be Your Most Resilient Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-8">Be Your Most Resilient With:</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <Card className="bg-white/5 border-gray-700/50 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">A Platform Technology Strategy</h3>
                  <p className="text-gray-400">
                    Rated a leader by industry analysts, our unified AI cybersecurity platform is continually evolving 
                    to address attack surface risk across education and government enterprises.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Global Threat Research</h3>
                  <p className="text-gray-400">
                    Across our 5 regional threat research centers, hundreds of security experts and data scientists 
                    are constantly gathering intelligence to better protect our customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">People Driven by Passion</h3>
                  <p className="text-gray-400">
                    What makes us different is a genuine passion for making the digital world safer not only for 
                    our customers, but also for the communities they serve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Platform Technology Strategy Details */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">A Platform Technology Strategy</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                With over 10 years of innovation and technology leadership, our AI cybersecurity platform, 
                <span className="text-cyan-400 font-semibold"> CyberSecure AI Vision</span>, is designed to help you better understand, 
                communicate, and mitigate cyber risk across your enterprise.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-12 bg-slate-800/50 rounded-lg p-2">
              {platformFeatures.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === index 
                      ? 'bg-cyan-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white/5 rounded-lg p-8 border border-gray-700/50">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">{platformFeatures[activeTab].title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {platformFeatures[activeTab].description}
                  </p>
                  <p className="text-gray-400 mb-8">
                    {platformFeatures[activeTab].details}
                  </p>
                  <Button className="bg-cyan-600 hover:bg-cyan-700">
                    See how
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-start space-x-4 mb-6">
                    <img 
                      src={platformFeatures[activeTab].customerLogo} 
                      alt="Customer"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                        <p className="text-gray-300 italic leading-relaxed">
                          "{platformFeatures[activeTab].customerQuote}"
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-white font-semibold">{platformFeatures[activeTab].customerName}</p>
                        <p className="text-cyan-400">{platformFeatures[activeTab].customerCompany}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    See story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market-leading Performance */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-8">Market-leading Performance</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recognitions.map((recognition, index) => (
                <Card key={index} className="bg-white/5 border-gray-700/50 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{recognition.logo}</h4>
                    <p className="text-sm text-gray-400 mb-4">{recognition.title}</p>
                    <Button variant="link" size="sm" className="text-cyan-400 p-0 h-auto">
                      Learn more →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Global Threat Research */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Global Threat Research</h2>
                <h3 className="text-xl font-semibold text-cyan-400 mb-6">
                  Understand and address the security challenges of today and tomorrow
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  The CyberSecure AI Research team delivers 24/7 threat research from around the globe, 
                  vulnerability intelligence from our Zero Day Initiative™ (ZDI) program, and the latest 
                  insights on the cybersecurity landscape.
                </p>
                <p className="text-gray-400 mb-8">
                  The team also works closely with government and law enforcement agencies, including 
                  the FBI, Department of Homeland Security, and various international cybersecurity organizations.
                </p>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  Read more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="bg-white/5 rounded-lg p-8 border border-gray-700/50">
                <div className="grid grid-cols-1 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Learn more about threat research
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* People Driven by Passion */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-8">People Driven by Passion</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white/5 border-gray-700/50">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Security experts with unique core values</h3>
                  <p className="text-gray-400">
                    With a non-stop focus on protecting customers through world-class security technologies and support, 
                    our team embodies core principles of customer value, collaboration, innovation, and trustworthiness.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                    <Globe className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">People focused on making the world better</h3>
                  <p className="text-gray-400">
                    We educate thousands of educational institutions and government agencies, as well as millions of 
                    users around the world, on how to be safe in our connected world through our community programs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Customer Testimonial */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <Card className="bg-white/5 border-gray-700/50">
              <CardContent className="p-12 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">What customers say</h3>
                <blockquote className="text-xl text-gray-300 italic mb-8 leading-relaxed">
                  "Our institution is all about protecting student data and academic integrity. The CyberSecure AI team was able to show us comprehensive protection that proved our systems weren't compromised. Our history with CyberSecure AI has been stellar from the beginning. I have a real sense of relationship and trust."
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img src={securityImagesPath} alt="Customer" className="w-12 h-12 rounded-full object-cover" />
                  <div className="text-left">
                    <p className="text-white font-semibold">Dr. Jennifer Martinez</p>
                    <p className="text-cyan-400">Chief Information Security Officer</p>
                    <p className="text-gray-400 text-sm">State University System</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-6 border-gray-600 text-gray-300">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  See story
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Customers Agree */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-8">Customers Agree</h2>
              <p className="text-xl text-gray-300 mb-12">
                With over 5,000+ educational and government customers across all 50 states, 
                CyberSecure AI protects many of the largest organizations in these critical sectors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="bg-cyan-500/20 rounded-lg p-8 border border-cyan-500/30">
                  <h3 className="text-2xl font-bold text-white mb-6">Education Sector Leaders</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• 8 of top 10 State University Systems</li>
                    <li>• 7 of top 10 Community College Networks</li>
                    <li>• 6 of top 10 K-12 District Alliances</li>
                    <li>• 9 of top 10 Educational Technology Providers</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="bg-blue-500/20 rounded-lg p-8 border border-blue-500/30">
                  <h3 className="text-2xl font-bold text-white mb-6">Government Sector Leaders</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>• 5 of top 10 Federal Agencies</li>
                    <li>• 7 of top 10 State Government Systems</li>
                    <li>• 8 of top 10 Municipal Government Networks</li>
                    <li>• 6 of top 10 Public Healthcare Systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-lg px-8 py-4">
                Hear more from organizations like yours
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">JOIN 5,000+ CUSTOMERS</h2>
            <h3 className="text-2xl text-cyan-400 mb-8">Check out our industry-leading platform</h3>
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg p-8">
              <h4 className="text-2xl font-bold text-white mb-4">
                CyberSecure AI Vision™ - Proactive Security Starts Here.
              </h4>
              <p className="text-blue-100 mb-6">
                Comprehensive AI-powered cybersecurity platform designed specifically for education and government sectors.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Learn more about our platform
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}