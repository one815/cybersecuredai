import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Star, Trophy, Medal, ExternalLink, Calendar, ArrowRight } from "lucide-react";

export default function Awards() {
  const awards = [
    {
      year: "2024",
      title: "Rising Star Award",
      subtitle: "Gold Winner - The Learning Awards",
      description: "Recognized for exceptional innovation in AI-powered cybersecurity solutions and outstanding leadership in driving digital security transformation for educational institutions.",
      image: "/attached_assets/Rising_Gold_1755639714060-Dj-zBU33_1756499508610.png"
    },
    {
      year: "2024",
      title: "Best Track Network - Data",
      subtitle: "BCBS North Carolina HCL Award", 
      description: "Achieved excellence in network data security and analytics for enterprise healthcare data protection systems.",
      image: "/attached_assets/BCBS North Carolina_1756499508608.jpg"
    },
    {
      year: "2025",
      title: "Achievers League Award",
      subtitle: "Above Recognition Beyond Rewards",
      description: "Distinguished achievement recognition for exceptional leadership and innovation in cybersecurity solutions and client success initiatives.",
      image: "/attached_assets/Achievers League_1756502961273.jpg"
    }
  ];

  const certifications = [
    {
      name: "FedRAMP Authorized",
      description: "Federal Risk and Authorization Management Program certified",
      icon: "🏛️"
    },
    {
      name: "FERPA Compliant", 
      description: "Family Educational Rights and Privacy Act compliant",
      icon: "🎓"
    },
    {
      name: "FISMA Compliant",
      description: "Federal Information Security Management Act compliant", 
      icon: "🔒"
    },
    {
      name: "SOC 2 Type II",
      description: "Service Organization Control 2 Type II certified",
      icon: "✅"
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
                Industry Recognition
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Recognition</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Recognized by industry leaders for innovation in AI-powered cybersecurity. 
                Our commitment to excellence has earned us prestigious awards and certifications 
                from the world's most respected cybersecurity organizations.
              </p>
            </div>
          </div>
        </section>

        {/* Awards Grid */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Recent Awards & Recognition</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <Card key={index} className="bg-white/5 border-gray-700/50 hover:bg-white/10 transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={award.image} 
                          alt={award.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        <Calendar className="w-3 h-3 mr-1" />
                        {award.year}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{award.title}</h3>
                    <p className="text-cyan-400 font-semibold text-sm mb-3">{award.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Certifications & Compliance</h2>
              <p className="text-xl text-gray-300">
                Meeting the highest standards for security and compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-white/5 border-gray-700/50 text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{cert.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{cert.name}</h3>
                    <p className="text-gray-400 text-sm">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience Award-Winning Security?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of educational institutions and government agencies who trust CyberSecure AI.
            </p>
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              Contact Our Team
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}