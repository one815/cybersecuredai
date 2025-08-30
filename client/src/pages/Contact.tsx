import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  ArrowRight,
  Send,
  Shield,
  Users,
  Building
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "info@cybersecuredai.com",
      description: "Send us a message anytime"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "(800) 608-1030",
      description: "Mon-Fri 8AM-6PM EST"
    },
    {
      icon: MapPin,
      title: "Address", 
      value: "123 Security Blvd, Tech City, TC 12345",
      description: "Visit our headquarters"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "< 24 hours",
      description: "We respond quickly"
    }
  ];

  const offices = [
    {
      city: "Washington, DC",
      address: "123 Security Blvd, Suite 100",
      phone: "(800) 608-1030",
      type: "Headquarters"
    },
    {
      city: "Austin, TX", 
      address: "456 Innovation Dr, Suite 200",
      phone: "(800) 608-1030",
      type: "Operations Center"
    },
    {
      city: "Denver, CO",
      address: "789 Cyber Ave, Suite 300", 
      phone: "(800) 608-1030",
      type: "Research Center"
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
                Get In Touch
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Our Team</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Ready to enhance your organization's cybersecurity? Our experts are here to help you 
                design the perfect security solution for your educational institution or government agency.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="bg-white/5 border-gray-700/50 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                      <p className="text-cyan-400 font-semibold mb-2">{method.value}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Schedule a Meeting Section */}
            <div className="text-center mb-16">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-6">
                Schedule Consultation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Book a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Security Consultation</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Schedule a personalized consultation with our cybersecurity experts. We'll assess your needs and design a custom security solution for your organization.
              </p>
              
              {/* Yesware Meeting Scheduler */}
              <Card className="bg-white/5 border-gray-700/50 max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="w-8 h-8 text-orange-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-white">Schedule Your Meeting</h3>
                      <p className="text-gray-400">Choose a time that works best for you</p>
                    </div>
                  </div>
                  
                  {/* Embedded Yesware Scheduler */}
                  <div className="bg-slate-800 rounded-lg p-6 min-h-[400px] border border-gray-600">
                    <iframe
                      src="https://meet.yesware.com/me/camilia/demo"
                      width="100%"
                      height="400"
                      frameBorder="0"
                      className="rounded-lg"
                      title="Schedule Consultation with CyberSecured AI"
                    />
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                      Can't find a suitable time? <a href="mailto:info@cybersecuredai.com" className="text-cyan-400 hover:text-cyan-300">Email us directly</a> to arrange a custom meeting time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form & Office Info */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-white/5 border-gray-700/50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                      <Send className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Send us a message</h3>
                      <p className="text-gray-400">We'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white mb-2 block">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your full name"
                          className="bg-slate-800 border-gray-600 text-white"
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your@email.com"
                          className="bg-slate-800 border-gray-600 text-white"
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="organization" className="text-white mb-2 block">Organization</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        placeholder="Your school/agency name"
                        className="bg-slate-800 border-gray-600 text-white"
                        data-testid="input-organization"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white mb-2 block">Message</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us about your cybersecurity needs..."
                        className="bg-slate-800 border-gray-600 text-white resize-none"
                        data-testid="textarea-message"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="button-4d w-full bg-cyan-600" 
                      data-testid="button-submit"
                    >
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Office Locations */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                    <Building className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Office Locations</h3>
                    <p className="text-gray-400">Visit us at any of our locations</p>
                  </div>
                </div>

                {offices.map((office, index) => (
                  <Card key={index} className="bg-white/5 border-gray-700/50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-white">{office.city}</h4>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          {office.type}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-2">{office.address}</p>
                      <p className="text-cyan-400 font-semibold">{office.phone}</p>
                    </CardContent>
                  </Card>
                ))}

                {/* Emergency Contact */}
                <Card className="bg-red-500/10 border-red-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Shield className="w-5 h-5 text-red-400 mr-2" />
                      <h4 className="text-lg font-bold text-white">Security Emergency</h4>
                    </div>
                    <p className="text-gray-300 mb-2">For urgent security incidents:</p>
                    <p className="text-red-400 font-bold text-lg">1-800-CYBER-911</p>
                    <p className="text-gray-400 text-sm mt-2">Available 24/7 for critical security incidents</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}