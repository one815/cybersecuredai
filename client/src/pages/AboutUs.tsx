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
  Enhanced4DArrowRightIcon
} from "@/components/CustomIcons";
import { 
  Shield, 
  Brain, 
  Target, 
  CheckCircle, 
  TrendingUp, 
  Globe, 
  ArrowRight,
  Users,
  Award
} from "lucide-react";
import { Link } from "wouter";

// Import professional images
import platformImg from "@assets/generated_images/Security_Analytics_Dashboard_ca1f5822.png";
import innovationImg from "@assets/generated_images/AI_Security_Implementation_d7886bac.png";
import complianceImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";

export default function AboutUs() {
  const keyMetrics = [
    { value: "500K+", label: "Students Protected", description: "Educational institutions secured" },
    { value: "98.7%", label: "Threat Detection Rate", description: "AI-powered accuracy" },
    { value: "24/7", label: "Continuous Monitoring", description: "Real-time protection" },
    { value: "15+", label: "Compliance Frameworks", description: "FERPA, FISMA, CIPA certified" }
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
                <Enhanced4DShieldIcon className="glass-icon w-4 h-4 mr-2" size={16} />
                About CyberSecure AI
              </Badge>
              <h1 className="text-5xl font-bold mb-6 text-white">
                Our Story
              </h1>
              <h2 className="text-3xl font-semibold mb-6 text-gray-300">
                Protecting Educational Futures with AI-Powered Cybersecurity
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                We are dedicated to safeguarding educational institutions and government agencies with cutting-edge AI-driven cybersecurity solutions, ensuring compliance, protecting sensitive data, and enabling secure learning environments.
              </p>
              <Link href="/about/leadership">
                <Button className="bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold">
                  Meet Our Team
                  <Enhanced4DArrowRightIcon className="glass-icon w-4 h-4 ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-spring-400 mb-2">{metric.value}</div>
                    <div className="text-white font-semibold mb-1">{metric.label}</div>
                    <div className="text-gray-400 text-sm">{metric.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="py-16 bg-midnight-900/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  CyberSecure AI exists to provide educational institutions and government agencies with the most advanced, AI-powered cybersecurity platform available. We combine cutting-edge artificial intelligence with deep cybersecurity expertise to create solutions that not only protect against current threats but anticipate and prevent future attacks.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Our platform is specifically designed to meet the unique compliance requirements of educational environments, ensuring FERPA, FISMA, and CIPA compliance while providing real-time threat detection and automated incident response.
                </p>
              </div>
              <div className="relative">
                <img 
                  src={platformImg} 
                  alt="CyberSecure AI Platform"
                  className="w-full h-96 object-cover rounded-lg border border-spring-500/30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Our Core Values</h2>
              <p className="text-gray-400 text-lg">
                The principles that guide our cybersecurity innovation and client relationships.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-midnight-800/50 border-midnight-700 text-center">
                <CardContent className="p-8">
                  <Enhanced4DShieldIcon className="glass-icon mx-auto mb-6" size={48} />
                  <h3 className="text-xl font-bold text-white mb-4">Security First</h3>
                  <p className="text-gray-300">
                    Every decision we make prioritizes the security and privacy of our clients' data and their constituents.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-midnight-800/50 border-midnight-700 text-center">
                <CardContent className="p-8">
                  <Enhanced4DBrainIcon className="glass-icon mx-auto mb-6" size={48} />
                  <h3 className="text-xl font-bold text-white mb-4">AI Innovation</h3>
                  <p className="text-gray-300">
                    We harness the power of artificial intelligence to stay ahead of evolving cybersecurity threats.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-midnight-800/50 border-midnight-700 text-center">
                <CardContent className="p-8">
                  <Enhanced4DCheckCircleIcon className="glass-icon mx-auto mb-6" size={48} />
                  <h3 className="text-xl font-bold text-white mb-4">Compliance Excellence</h3>
                  <p className="text-gray-300">
                    We ensure our solutions meet and exceed all regulatory requirements for educational institutions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="py-16 bg-midnight-900/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={innovationImg} 
                  alt="AI Security Innovation"
                  className="w-full h-96 object-cover rounded-lg border border-spring-500/30"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Why Educational Institutions Choose Us</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Enhanced4DCheckCircleIcon className="glass-icon w-5 h-5 mt-1 text-spring-400" size={20} />
                    <div>
                      <h3 className="font-semibold text-white">AI-Powered Threat Detection</h3>
                      <p className="text-gray-300">Advanced machine learning algorithms detect and respond to threats in real-time.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Enhanced4DCheckCircleIcon className="glass-icon w-5 h-5 mt-1 text-spring-400" size={20} />
                    <div>
                      <h3 className="font-semibold text-white">Regulatory Compliance</h3>
                      <p className="text-gray-300">Built-in compliance with FERPA, FISMA, CIPA, and other educational standards.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Enhanced4DCheckCircleIcon className="glass-icon w-5 h-5 mt-1 text-spring-400" size={20} />
                    <div>
                      <h3 className="font-semibold text-white">24/7 Monitoring</h3>
                      <p className="text-gray-300">Continuous monitoring and automated incident response to protect your institution.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Enhanced4DCheckCircleIcon className="glass-icon w-5 h-5 mt-1 text-spring-400" size={20} />
                    <div>
                      <h3 className="font-semibold text-white">Educational Expertise</h3>
                      <p className="text-gray-300">Deep understanding of educational environments and their unique security challenges.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <Card className="bg-gradient-to-r from-spring-900/20 to-cyber-blue-900/20 border-spring-500/30">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-white">Ready to Secure Your Institution?</h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join hundreds of educational institutions and government agencies that trust CyberSecure AI to protect their most valuable assets.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold">
                      Contact Sales
                      <Enhanced4DArrowRightIcon className="glass-icon w-4 h-4 ml-2" size={16} />
                    </Button>
                  </Link>
                  <Link href="/about/leadership">
                    <Button variant="outline" className="border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-midnight-900">
                      Meet Our Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}