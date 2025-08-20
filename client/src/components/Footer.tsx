import { Link } from "wouter";
import { Bot, Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-surface/50">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About Us</span></Link></li>
              <li><Link href="/careers"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Careers</span></Link></li>
              <li><Link href="/blog"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Blog</span></Link></li>
              <li><Link href="/news"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">News</span></Link></li>
              <li><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm cursor-pointer">Contact</span></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link href="/solutions"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">K-12 Schools</span></Link></li>
              <li><Link href="/solutions"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Higher Education</span></Link></li>
              <li><Link href="/solutions"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Municipal Gov</span></Link></li>
              <li><Link href="/solutions"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Federal Agencies</span></Link></li>
              <li><Link href="/security-scanner"><span className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Security Scanner</span></Link></li>
            </ul>
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
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-0">
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
                <span className="text-xs text-gray-400">CIPA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-gray-400">NIST SP 800-53</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              © 2024 CyberSecure AI. All rights reserved. Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}