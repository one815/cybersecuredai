import { Link } from "wouter";
import { Bot, Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github, ExternalLink } from "lucide-react";
import cypherAiAssistImage from '@assets/Cypher AI Asst. webp_1757949055406.webp';
import ferpaCompliantImg from "@assets/ferpa compliant_1755703343167.jpg";
import fismaCompliantImg from "@assets/fisme compliant_1755703347744.webp";
import fedrampAuthorizedImg from "@assets/fedramp authorized_1755703346268.jpg";
import nistCompliantImg from "@assets/NIST compliant_1755703344784.jpg";
import soc2CompliantImg from "@assets/SOC 2_1755704176279-Cr4UCYMb_1756458605841.jpg";
import isoCompliantImg from "@assets/ISO certified 2_1756459077090.jpg";

export function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-surface/50">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/assets/CyberSecured AI logo_1757949055406.webp" 
                alt="CyberSecured AI" 
                className="h-24 w-auto"
              />
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
              <li className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">Cloud Security & AI Analytics</li>
              <li><Link href="/platform/automated-incident-response"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Automated Incident Response</span></Link></li>
              <li><Link href="/platform/threat-detection"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Threat Detection System</span></Link></li>
              <li><Link href="/platform/predictive-risk-analysis"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Predictive Risk Analysis</span></Link></li>
              <li className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Network Infrastructure</li>
              <li><Link href="/platform/firewall-management"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Firewall Management</span></Link></li>
              <li><Link href="/platform/network-monitoring"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Router & Switch Monitoring</span></Link></li>
              <li><Link href="/platform/zero-trust"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Zero-Trust Architecture</span></Link></li>
              <li className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Endpoint Security</li>
              <li><Link href="/platform/monitoring-vulnerability"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">24/7 Monitoring & Vulnerability</span></Link></li>
              <li><Link href="/platform/iam"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Identity & Access Management</span></Link></li>
              <li><Link href="/platform/system-administration"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">System Administration</span></Link></li>
              <li className="text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Compliance & Risk</li>
              <li><Link href="/platform/compliance-automation"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Compliance Automation</span></Link></li>
              <li><Link href="/platform/security-training"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Security Awareness Training</span></Link></li>
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
              <li><Link href="/solutions/ai-threat-detection"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">AI-Powered Threat Detection</span></Link></li>
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
              <li className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 mt-4">Features</li>
              <li><Link href="/resources/threat-report-2025"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Annual Threat Report 2025</span></Link></li>
              <li><Link href="/resources/integrations"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Tech Integrations</span></Link></li>
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
                See how CyberSecured AI compares to other cybersecurity platforms in the market.
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
              <span className="text-gray-400 text-sm">info@cybersecuredai.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">(800) 608-1030</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">Willow Park, Texas, USA</span>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="border-t border-surface/50 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-wrap items-center gap-6 mb-4 lg:mb-0">
              <img 
                src={ferpaCompliantImg} 
                alt="FERPA Compliant" 
                className="h-16 w-auto hover:scale-105 transition-transform duration-200"
              />
              <img 
                src={fismaCompliantImg} 
                alt="FISMA Compliant" 
                className="h-16 w-auto hover:scale-105 transition-transform duration-200"
              />
              <img 
                src={fedrampAuthorizedImg} 
                alt="FedRAMP Authorized" 
                className="h-16 w-auto hover:scale-105 transition-transform duration-200"
              />
              <img 
                src={nistCompliantImg} 
                alt="NIST SP 800-53 Compliant" 
                className="h-16 w-auto hover:scale-105 transition-transform duration-200"
              />
              <img 
                src={soc2CompliantImg} 
                alt="SOC 2 Type II Compliant" 
                className="h-16 w-auto hover:scale-105 transition-transform duration-200"
              />
              <img 
                src={isoCompliantImg} 
                alt="ISO 27001 Certified" 
                className="h-20 w-auto hover:scale-105 transition-transform duration-200"
              />
            </div>
            <p className="text-xs text-gray-500">
              © 2024 CyberSecured AI. All rights reserved. <Link href="/legal/privacy-policy"><span className="hover:text-cyan-400 transition-colors cursor-pointer">Privacy Policy</span></Link> | <Link href="/legal/terms-of-service"><span className="hover:text-cyan-400 transition-colors cursor-pointer">Terms of Service</span></Link> | <Link href="/legal"><span className="hover:text-cyan-400 transition-colors cursor-pointer">Legal</span></Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}