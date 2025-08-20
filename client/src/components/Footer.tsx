import { Link } from "wouter";
import { Bot, Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-surface/50">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                CyberSecure AI
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              AI-powered cybersecurity platform designed specifically for education and government sectors. 
              Comprehensive threat detection, automated incident response, and compliance management.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/cybersecureai" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/cybersecureai" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/cybersecureai" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/platform/mdr"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Managed Detection & Response</span></Link></li>
              <li><Link href="/platform/endpoint"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Endpoint Security</span></Link></li>
              <li><Link href="/platform/network"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Network Security</span></Link></li>
              <li><Link href="/platform/email"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Email Security</span></Link></li>
              <li><Link href="/platform/iam"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Identity & Access</span></Link></li>
              <li><Link href="/platform/vulnerability"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Vulnerability Management</span></Link></li>
              <li><Link href="/platform/compliance"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Compliance Management</span></Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">By Topic</li>
              <li><Link href="/solutions/ransomware"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Ransomware Protection</span></Link></li>
              <li><Link href="/solutions/zero-trust"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Zero Trust Security</span></Link></li>
              <li><Link href="/solutions/cloud"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Cloud Security</span></Link></li>
              <li className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">By Industry</li>
              <li><Link href="/solutions/k12"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">K-12 Education</span></Link></li>
              <li><Link href="/solutions/higher-ed"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Higher Education</span></Link></li>
              <li><Link href="/solutions/municipal"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Municipal Government</span></Link></li>
              <li><Link href="/solutions/federal"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Federal Agencies</span></Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">Resource Center</li>
              <li><Link href="/resources/client-stories"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Client Stories</span></Link></li>
              <li><Link href="/resources/datasheets"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Datasheets</span></Link></li>
              <li><Link href="/resources/ebooks"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Ebooks</span></Link></li>
              <li><Link href="/resources/reports"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Reports</span></Link></li>
              <li><Link href="/resources/webinars"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">On Demand Webinars</span></Link></li>
              <li><Link href="/resources/whitepapers"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Whitepapers</span></Link></li>
              <li className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Knowledge Center</li>
              <li><Link href="/blogs"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Blogs</span></Link></li>
              <li><Link href="/resources/demos"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Demos</span></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about-us"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Our Story</span></Link></li>
              <li><Link href="/about/leadership"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Leadership</span></Link></li>
              <li><Link href="/news"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Latest News</span></Link></li>
              <li><Link href="/about/awards"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Awards</span></Link></li>
              <li><Link href="/careers"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Careers</span></Link></li>
              <li><Link href="/contact"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact Us</span></Link></li>
              <li><Link href="/pricing"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Pricing</span></Link></li>
            </ul>
          </div>
        </div>

        {/* Featured Resources */}
        <div className="border-t border-surface/50 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-4 border border-cyan-500/20">
              <h4 className="text-white font-semibold mb-2 flex items-center">
                <span>Annual Threat Report 2025</span>
                <ExternalLink className="w-4 h-4 ml-2 text-cyan-400" />
              </h4>
              <p className="text-gray-400 text-sm mb-3">
                Comprehensive analysis of the latest cybersecurity threats targeting education and government sectors.
              </p>
              <Link href="/resources/threat-report-2025">
                <span className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors cursor-pointer">Download Report →</span>
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg p-4 border border-purple-500/20">
              <h4 className="text-white font-semibold mb-2">Compare Solutions</h4>
              <p className="text-gray-400 text-sm mb-3">
                See how CyberSecure AI compares to other cybersecurity platforms in the market.
              </p>
              <Link href="/compare">
                <span className="text-purple-400 text-sm hover:text-purple-300 transition-colors cursor-pointer">View Comparisons →</span>
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-4 border border-green-500/20">
              <h4 className="text-white font-semibold mb-2">Free Security Scan</h4>
              <p className="text-gray-400 text-sm mb-3">
                Get a complimentary security assessment of your organization's current posture.
              </p>
              <Link href="/security-scanner">
                <span className="text-green-400 text-sm hover:text-green-300 transition-colors cursor-pointer">Start Scan →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-surface/50 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">contact@cybersecure.ai</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">1-800-CYBER-AI</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">Austin, Texas, USA</span>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="border-t border-surface/50 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-wrap items-center gap-4 mb-4 lg:mb-0">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-400">FERPA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400">FISMA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-gray-400">FedRAMP Authorized</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-gray-400">NIST SP 800-53</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-gray-400">SOC 2 Type II</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              © 2024 CyberSecure AI. All rights reserved. <Link href="/privacy"><span className="hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</span></Link> | <Link href="/terms"><span className="hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</span></Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}