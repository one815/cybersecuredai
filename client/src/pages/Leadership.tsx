import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LinkedinIcon, 
  TwitterIcon, 
  ArrowRight,
  Shield,
  Brain,
  Award,
  Users
} from "lucide-react";

export default function Leadership() {
  const leaders = [
    {
      name: "Dr. Michael Chen",
      title: "Chief Executive Officer & Founder",
      bio: "Former NSA cybersecurity director with 15+ years protecting critical infrastructure. PhD in Computer Science from MIT.",
      image: "/api/placeholder/400/400",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Sarah Rodriguez",
      title: "Chief Technology Officer",
      bio: "Former Google Security lead with expertise in AI/ML threat detection. Led teams building security systems for Fortune 500.",
      image: "/api/placeholder/400/400", 
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Jennifer Martinez",
      title: "Chief Security Officer",
      bio: "20+ years in government cybersecurity. Former Department of Homeland Security Deputy Director for Cybersecurity.",
      image: "/api/placeholder/400/400",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "David Thompson",
      title: "Chief Revenue Officer", 
      bio: "Former VP Sales at CrowdStrike. Expert in scaling cybersecurity solutions for education and government sectors.",
      image: "/api/placeholder/400/400",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const advisors = [
    {
      name: "General Keith Alexander",
      title: "Strategic Advisor",
      bio: "Former Director of NSA and Commander of U.S. Cyber Command",
      company: "National Security Agency (Ret.)"
    },
    {
      name: "Dr. Lisa Wong",
      title: "AI Ethics Advisor", 
      bio: "Professor of AI Ethics at Stanford, Expert in responsible AI deployment",
      company: "Stanford University"
    }
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
                Meet Our Team
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Leadership <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Team</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Led by cybersecurity veterans with deep expertise in AI, government security, 
                and education technology. Our leadership team combines decades of experience 
                protecting critical infrastructure with cutting-edge AI innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Executive Leadership</h2>
              <p className="text-xl text-gray-300">
                Proven leaders with deep cybersecurity expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {leaders.map((leader, index) => (
                <Card key={index} className="bg-white/5 border-gray-700/50 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Users className="w-12 h-12 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{leader.name}</h3>
                        <p className="text-cyan-400 font-semibold mb-4">{leader.title}</p>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {leader.bio}
                        </p>
                        <div className="flex space-x-3">
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                            <LinkedinIcon className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                            <TwitterIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory Board */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Strategic Advisory Board</h2>
              <p className="text-xl text-gray-300">
                Industry experts guiding our strategic direction
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {advisors.map((advisor, index) => (
                <Card key={index} className="bg-white/5 border-gray-700/50">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{advisor.name}</h3>
                        <p className="text-cyan-400 font-semibold text-sm mb-2">{advisor.title}</p>
                        <p className="text-gray-400 text-sm mb-2">{advisor.bio}</p>
                        <p className="text-gray-500 text-xs">{advisor.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
              <p className="text-xl text-gray-300">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/5 border-gray-700/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Security First</h3>
                  <p className="text-gray-400">
                    Every decision is made with security as the primary consideration, ensuring robust protection for our customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
                  <p className="text-gray-400">
                    Leveraging cutting-edge AI and machine learning to stay ahead of evolving cyber threats.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gray-700/50">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
                  <p className="text-gray-400">
                    Commitment to delivering world-class cybersecurity solutions that exceed expectations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}