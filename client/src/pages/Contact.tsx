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
  Building,
  Headphones,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Monitor,
  Zap
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    category: "general",
    priority: "medium",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Determine category based on message content
      const messageText = formData.message.toLowerCase();
      let category = formData.category;
      
      if (messageText.includes('security') || messageText.includes('breach') || messageText.includes('attack')) {
        category = 'security';
      } else if (messageText.includes('compliance') || messageText.includes('ferpa') || messageText.includes('fisma')) {
        category = 'compliance';
      } else if (messageText.includes('technical') || messageText.includes('bug') || messageText.includes('error')) {
        category = 'technical';
      } else if (messageText.includes('urgent') || messageText.includes('emergency')) {
        category = 'emergency';
      }

      // Determine priority based on keywords
      let priority = formData.priority;
      if (messageText.includes('urgent') || messageText.includes('emergency') || messageText.includes('critical')) {
        priority = 'critical';
      } else if (messageText.includes('important') || messageText.includes('asap')) {
        priority = 'high';
      }

      const ticketData = {
        title: `Contact Form Inquiry - ${formData.organization || 'General'}`,
        description: formData.message,
        category: category,
        priority: priority,
        submitterName: formData.name,
        submitterEmail: formData.email,
        submitterOrganization: formData.organization,
        submitterPhone: formData.phone,
        tags: ['contact-form', 'website'],
        metadata: {
          source: 'website_contact_form',
          submittedAt: new Date().toISOString(),
          userAgent: navigator.userAgent
        }
      };

      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }

      const result = await response.json();

      if (result.success) {
        setSubmittedTicket(result.ticketNumber);
        toast({
          title: "Support Ticket Created!",
          description: `Your ticket ${result.ticketNumber} has been created successfully. We'll respond within 24 hours.`,
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          organization: "",
          message: "",
          category: "general",
          priority: "medium",
          phone: ""
        });
      } else {
        throw new Error(result.message || 'Failed to create ticket');
      }
    } catch (error: any) {
      console.error('Error submitting ticket:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      value: "395 Pitchfork Trail, Suite 902, Willow Park, TX 76087",
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
      city: "Willow Park, TX",
      address: "395 Pitchfork Trail, Suite 902",
      phone: "(800) 608-1030",
      type: "Headquarters"
    },
    {
      city: "Washington, DC", 
      address: "1717 Pennsylvania Avenue NW, Suite 1025",
      phone: "(800) 608-1030",
      type: "Research Center"
    },
    {
      city: "Wilmington, DE",
      address: "1313 N. Market, 12th FL", 
      phone: "(800) 608-1030",
      type: "Operations Center"
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

            {/* Support Services Section */}
            <section className="mb-20">
              <div className="text-center mb-12">
                <Badge className="bg-spring-500/20 text-spring-400 border-spring-500/30 mb-4">
                  Enterprise Support
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-spring-400 to-cyan-400">Platform Support</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Enterprise-grade support operations with automated incident management, 
                  real-time monitoring, and government-compliant service levels.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white/5 border-spring-500/30 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-spring-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Headphones className="w-6 h-6 text-spring-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">24/7 Support Operations</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Round-the-clock support with PagerDuty-integrated incident response and 15-minute average response times.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-spring-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        PagerDuty Integration
                      </div>
                      <div className="flex items-center text-xs text-spring-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        15-min Response SLA
                      </div>
                      <div className="flex items-center text-xs text-spring-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        FISMA-Compliant
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-cyan-500/30 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Monitor className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Real-time API Monitoring</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Sub-20ms API monitoring with automated alerting for threat intelligence and security operations.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-cyan-400">
                        <Zap className="w-3 h-3 mr-2" />
                        Sub-20ms Performance
                      </div>
                      <div className="flex items-center text-xs text-cyan-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Automated Monitoring
                      </div>
                      <div className="flex items-center text-xs text-cyan-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Real-time Alerts
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-orange-500/30 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                      <AlertTriangle className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Automated Incident Management</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Automated security workflow management with compliance tracking and audit trails.
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-orange-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Automated Workflows
                      </div>
                      <div className="flex items-center text-xs text-orange-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Compliance Tracking
                      </div>
                      <div className="flex items-center text-xs text-orange-400">
                        <CheckCircle className="w-3 h-3 mr-2" />
                        Audit Trail Management
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/5 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <MessageSquare className="w-6 h-6 text-blue-400 mr-3" />
                      <h3 className="text-xl font-bold text-white">Support Channels</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">Email Support</span>
                        <span className="text-blue-400 text-sm">&lt; 30 min response</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">Phone Support</span>
                        <span className="text-green-400 text-sm">&lt; 5 min response</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">Live Chat</span>
                        <span className="text-spring-400 text-sm">&lt; 2 min response</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">Remote Support</span>
                        <span className="text-orange-400 text-sm">&lt; 15 min response</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Shield className="w-6 h-6 text-green-400 mr-3" />
                      <h3 className="text-xl font-bold text-white">Enterprise SLAs</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">Critical Issues</span>
                        <span className="text-red-400 text-sm">15 min</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">High Priority</span>
                        <span className="text-orange-400 text-sm">4 hours</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">Standard</span>
                        <span className="text-blue-400 text-sm">24 hours</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-gray-300">Uptime SLA</span>
                        <span className="text-green-400 text-sm">99.9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

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
                        <Label htmlFor="name" className="text-white mb-2 block">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your full name"
                          className="bg-slate-800 border-gray-600 text-white"
                          data-testid="input-name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white mb-2 block">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your@email.com"
                          className="bg-slate-800 border-gray-600 text-white"
                          data-testid="input-email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
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
                        <Label htmlFor="phone" className="text-white mb-2 block">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 123-4567"
                          className="bg-slate-800 border-gray-600 text-white"
                          data-testid="input-phone"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white mb-2 block">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us about your cybersecurity needs... (include keywords like 'security', 'compliance', 'technical', or 'urgent' for proper categorization)"
                        className="bg-slate-800 border-gray-600 text-white resize-none"
                        data-testid="textarea-message"
                        required
                      />
                    </div>

                    {submittedTicket && (
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                          <div>
                            <h4 className="text-green-400 font-semibold">Ticket Created Successfully!</h4>
                            <p className="text-green-300 text-sm">
                              Your support ticket <span className="font-mono font-bold">{submittedTicket}</span> has been created. 
                              We'll respond within 24 hours to your email address.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="button-4d w-full bg-cyan-600" 
                      data-testid="button-submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          Creating Ticket...
                          <div className="w-4 h-4 ml-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        </>
                      ) : (
                        <>
                          Create Support Ticket
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
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