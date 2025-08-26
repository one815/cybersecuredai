import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Eye, 
  Zap, 
  Globe, 
  Fingerprint, 
  Monitor,
  Shield,
  ArrowRight,
  Play
} from "lucide-react";

// Import futuristic components
import { InteractiveSecurityViz } from "@/components/futuristic/InteractiveSecurityViz";
import { ThreatTimelineInterface } from "@/components/futuristic/ThreatTimelineInterface";
import { DigitalTwinSimulator } from "@/components/futuristic/DigitalTwinSimulator";
import { BiometricNavigation } from "@/components/futuristic/BiometricNavigation";
import { ImmersiveWarRoom } from "@/components/futuristic/ImmersiveWarRoom";

export default function FuturisticDemo() {
  const [activeDemo, setActiveDemo] = useState<string>("security-viz");

  const futuristicFeatures = [
    {
      id: "security-viz",
      title: "3D Security Visualization",
      description: "Explore your security infrastructure in an interactive 3D environment with real-time threat mapping",
      icon: <Globe className="w-8 h-8 text-cyan-400" />,
      badge: "Interactive 3D",
      features: ["Real-time 3D network topology", "Interactive node exploration", "Dynamic threat visualization", "Cyberpunk-style interface"]
    },
    {
      id: "threat-timeline", 
      title: "Threat Timeline Interface",
      description: "Immersive timeline showing security incidents unfolding with AI-powered response visualization",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      badge: "AI-Powered",
      features: ["Real-time incident tracking", "Playback speed control", "Interactive event details", "Response time analytics"]
    },
    {
      id: "digital-twin",
      title: "Digital Twin Simulator", 
      description: "Create a digital twin of your network and simulate security scenarios with visual feedback",
      icon: <Monitor className="w-8 h-8 text-purple-400" />,
      badge: "Simulation",
      features: ["Network simulation", "Attack scenario testing", "Real-time status updates", "Interactive controls"]
    },
    {
      id: "biometric-nav",
      title: "Biometric Navigation",
      description: "Next-gen interface with eye tracking and gesture-based navigation for security dashboards",
      icon: <Eye className="w-8 h-8 text-green-400" />,
      badge: "Biometric",
      features: ["Simulated eye tracking", "Gesture recognition", "Touch-free interaction", "Accessibility features"]
    },
    {
      id: "war-room",
      title: "Immersive War Room",
      description: "Command center visualization with real-time threat monitoring and tactical response interface",
      icon: <Shield className="w-8 h-8 text-red-400" />,
      badge: "Command Center", 
      features: ["Real-time threat map", "Multi-view modes", "Alert streaming", "Defense status monitoring"]
    }
  ];

  const currentFeature = futuristicFeatures.find(f => f.id === activeDemo);

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative py-24 bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(#grid)"/></svg>')}")`
          }}></div>
          
          <div className="relative container mx-auto px-4 text-center">
            <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/50 mb-6">
              🚀 FUTURISTIC CYBERSECURITY
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Next-Generation Cyber Experience
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
              Immerse yourself in the future of cybersecurity with interactive 3D visualizations, 
              biometric navigation, AI-powered threat timelines, and digital twin simulations. 
              Experience cybersecurity like never before.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {futuristicFeatures.map(feature => (
                <Button
                  key={feature.id}
                  onClick={() => setActiveDemo(feature.id)}
                  className={`p-6 h-auto flex-col space-y-2 transition-all duration-300 ${
                    activeDemo === feature.id
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 scale-105'
                      : 'bg-surface/50 hover:bg-cyan-600/20 hover:scale-102'
                  }`}
                >
                  {feature.icon}
                  <div className="text-sm font-semibold">{feature.badge}</div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Showcase */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Feature Info Panel */}
            <Card className="lg:col-span-1 bg-gradient-to-b from-surface to-surface-light border-cyan-500/30 cyber-glow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  {currentFeature?.icon}
                  <Badge className="bg-cyan-600/20 text-cyan-400 border-cyan-500/50">
                    {currentFeature?.badge}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-cyan-300">
                  {currentFeature?.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentFeature?.description}
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-cyan-400">Key Features:</div>
                  {currentFeature?.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-6">
                  <Play className="w-4 h-4 mr-2" />
                  Launch Full Demo
                </Button>
              </CardContent>
            </Card>

            {/* Interactive Demo Area */}
            <div className="lg:col-span-3">
              <Card className="bg-surface border-cyan-500/30 cyber-glow">
                <CardContent className="p-6">
                  {activeDemo === "security-viz" && <InteractiveSecurityViz />}
                  {activeDemo === "threat-timeline" && <ThreatTimelineInterface />}
                  {activeDemo === "digital-twin" && <DigitalTwinSimulator />}
                  {activeDemo === "biometric-nav" && <BiometricNavigation />}
                  {activeDemo === "war-room" && <ImmersiveWarRoom />}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Technology Overview */}
          <Card className="bg-gradient-to-r from-gray-900 to-blue-900/20 border-cyan-500/30 cyber-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-cyan-300 mb-4">
                Powered by Advanced Technologies
              </CardTitle>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our futuristic cybersecurity platform leverages cutting-edge technologies to provide 
                an unparalleled user experience that makes complex security concepts intuitive and engaging.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Real-time Canvas Rendering",
                    description: "High-performance 2D/3D visualizations with smooth animations and particle effects",
                    icon: <Monitor className="w-8 h-8 text-cyan-400" />,
                    tech: ["HTML5 Canvas", "WebGL", "Animation Frames", "Particle Systems"]
                  },
                  {
                    title: "AI-Powered Analytics", 
                    description: "Machine learning algorithms for predictive threat detection and behavioral analysis",
                    icon: <Brain className="w-8 h-8 text-purple-400" />,
                    tech: ["Neural Networks", "Pattern Recognition", "Predictive Models", "Real-time ML"]
                  },
                  {
                    title: "Biometric Simulation",
                    description: "Advanced user interaction models including eye tracking and gesture recognition",
                    icon: <Fingerprint className="w-8 h-8 text-green-400" />,
                    tech: ["Eye Tracking API", "Gesture Recognition", "Touch Events", "Accessibility"]
                  }
                ].map((tech, index) => (
                  <Card key={index} className="bg-surface-light/50 border-surface-light">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">{tech.icon}</div>
                      <h3 className="text-lg font-semibold text-white mb-2">{tech.title}</h3>
                      <p className="text-sm text-gray-300 mb-4">{tech.description}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {tech.tech.map(item => (
                          <Badge key={item} variant="outline" className="text-xs border-cyan-500/50 text-cyan-400">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-cyan-300 mb-4">
              Ready to Experience the Future?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your cybersecurity operations with our next-generation platform. 
              Schedule a demo to see these futuristic features in action.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-3">
                Schedule Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}