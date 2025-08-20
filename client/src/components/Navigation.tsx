import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Bot, Menu, X, ChevronDown } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: "Platform",
      href: "/platform",
      dropdown: [
        { label: "Managed Detection & Response", href: "/platform/mdr" },
        { label: "Endpoint Security", href: "/platform/endpoint" },
        { label: "Network Security", href: "/platform/network" },
        { label: "Email Security", href: "/platform/email" },
        { label: "Identity & Access Management", href: "/platform/iam" },
        { label: "Vulnerability Management", href: "/platform/vulnerability" },
        { label: "Compliance Management", href: "/platform/compliance" },
        { label: "Incident Response", href: "/platform/incident-response" }
      ]
    },
    {
      label: "Solutions",
      href: "/solutions",
      dropdown: [
        { label: "By Topic", href: "/solutions#topics", isHeader: true },
        { label: "Ransomware Protection", href: "/solutions/ransomware" },
        { label: "Zero Trust Security", href: "/solutions/zero-trust" },
        { label: "Cloud Security", href: "/solutions/cloud" },
        { label: "AI-Powered Threat Detection", href: "/solutions/ai-threat-detection" },
        { label: "By Industry", href: "/solutions#industries", isHeader: true },
        { label: "K-12 Education", href: "/solutions/k12" },
        { label: "Higher Education", href: "/solutions/higher-ed" },
        { label: "Municipal Government", href: "/solutions/municipal" },
        { label: "Federal Agencies", href: "/solutions/federal" }
      ]
    },
    {
      label: "Why CyberSecure AI",
      href: "/why-cybersecure-ai",
      dropdown: [
        { label: "Who We Serve", href: "/who-we-serve" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "vs. CrowdStrike", href: "/compare/crowdstrike" },
        { label: "vs. SentinelOne", href: "/compare/sentinelone" },
        { label: "vs. Microsoft Defender", href: "/compare/microsoft" },
        { label: "vs. Palo Alto Networks", href: "/compare/palo-alto" },
        { label: "vs. Fortinet", href: "/compare/fortinet" }
      ]
    },
    {
      label: "Resources",
      href: "/resources",
      dropdown: [
        { label: "Resource Center", href: "/resources#center", isHeader: true },
        { label: "Client Stories", href: "/resources/client-stories" },
        { label: "Datasheets", href: "/resources/datasheets" },
        { label: "Ebooks", href: "/resources/ebooks" },
        { label: "Reports", href: "/resources/reports" },
        { label: "On Demand Webinars", href: "/resources/webinars" },
        { label: "Whitepapers", href: "/resources/whitepapers" },
        { label: "Knowledge Center", href: "/resources#knowledge", isHeader: true },
        { label: "Blogs", href: "/blogs" },
        { label: "Demos", href: "/resources/demos" },
        { label: "Features", href: "/resources#features", isHeader: true },
        { label: "Annual Threat Report 2025", href: "/resources/threat-report-2025" },
        { label: "Tech Integrations", href: "/resources/integrations" }
      ]
    },
    { label: "Pricing", href: "/pricing" },
    {
      label: "About",
      href: "/about",
      dropdown: [
        { label: "Our Story", href: "/about-us" },
        { label: "Leadership", href: "/about/leadership" },
        { label: "Latest News", href: "/news" },
        { label: "Awards", href: "/about/awards" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" }
      ]
    }
  ];

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-surface sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                CyberSecure AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.dropdown ? (
                  <div
                    className="flex items-center space-x-1 text-sm font-medium transition-all duration-200 hover:text-cyan-400 cursor-pointer text-gray-300 px-3 py-2 rounded-lg hover:bg-cyan-500/10 relative group"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <span className="relative">
                      {item.label}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"></div>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180 text-cyan-400' : ''}`} />
                    
                    {/* Dropdown Menu */}
                    {openDropdown === item.label && (
                      <div className={`absolute top-full left-0 mt-1 ${
                        item.label === 'Resources' ? 'w-96' : 
                        item.label === 'Solutions' ? 'w-80' : 
                        item.label === 'Why CyberSecure AI' ? 'w-80' : 
                        'w-72'
                      } bg-slate-800/95 backdrop-blur-xl border-2 border-cyan-400/50 rounded-xl shadow-2xl cyber-glow-strong z-50 animate-in fade-in-0 zoom-in-95 duration-200`}>
                        
                        {/* Multi-column layout for larger menus */}
                        {item.label === 'Resources' ? (
                          <div className="py-3">
                            <div className="grid grid-cols-2 gap-x-6">
                              {/* Left Column - Resource Center */}
                              <div>
                                <div className="px-5 py-3 text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/20 border-b border-cyan-500/30">
                                  Resource Center
                                </div>
                                {item.dropdown.slice(1, 7).map((dropdownItem, index) => (
                                  <Link key={index} href={dropdownItem.href}>
                                    <div className="px-5 py-3 text-sm text-white hover:text-cyan-400 hover:bg-cyan-500/20 cursor-pointer transition-all duration-200 border-l-3 border-transparent hover:border-cyan-400">
                                      {dropdownItem.label}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              
                              {/* Right Column - Knowledge Center & Features */}
                              <div>
                                <div className="px-5 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider bg-purple-500/20 border-b border-purple-500/30">
                                  Knowledge Center
                                </div>
                                {item.dropdown.slice(8, 10).map((dropdownItem, index) => (
                                  <Link key={index} href={dropdownItem.href}>
                                    <div className="px-5 py-3 text-sm text-white hover:text-purple-400 hover:bg-purple-500/20 cursor-pointer transition-all duration-200 border-l-3 border-transparent hover:border-purple-400">
                                      {dropdownItem.label}
                                    </div>
                                  </Link>
                                ))}
                                
                                <div className="px-5 py-3 text-xs font-bold text-orange-400 uppercase tracking-wider bg-orange-500/20 border-b border-orange-500/30 mt-2">
                                  Features
                                </div>
                                {item.dropdown.slice(11).map((dropdownItem, index) => (
                                  <Link key={index} href={dropdownItem.href}>
                                    <div className="px-5 py-3 text-sm text-white hover:text-orange-400 hover:bg-orange-500/20 cursor-pointer transition-all duration-200 border-l-3 border-transparent hover:border-orange-400">
                                      {dropdownItem.label}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : item.label === 'Solutions' ? (
                          <div className="py-3">
                            <div className="grid grid-cols-2 gap-x-6">
                              {/* Left Column - By Topic */}
                              <div>
                                <div className="px-5 py-3 text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/20 border-b border-cyan-500/30">
                                  By Topic
                                </div>
                                {item.dropdown.slice(1, 5).map((dropdownItem, index) => (
                                  <Link key={index} href={dropdownItem.href}>
                                    <div className="px-5 py-3 text-sm text-white hover:text-cyan-400 hover:bg-cyan-500/20 cursor-pointer transition-all duration-200 border-l-3 border-transparent hover:border-cyan-400">
                                      {dropdownItem.label}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              
                              {/* Right Column - By Industry */}
                              <div>
                                <div className="px-5 py-3 text-xs font-bold text-green-400 uppercase tracking-wider bg-green-500/20 border-b border-green-500/30">
                                  By Industry
                                </div>
                                {item.dropdown.slice(6).map((dropdownItem, index) => (
                                  <Link key={index} href={dropdownItem.href}>
                                    <div className="px-5 py-3 text-sm text-white hover:text-green-400 hover:bg-green-500/20 cursor-pointer transition-all duration-200 border-l-3 border-transparent hover:border-green-400">
                                      {dropdownItem.label}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : item.label === 'Why CyberSecure AI' ? (
                          <div className="py-3">
                            {item.dropdown.map((dropdownItem, index) => (
                              <Link key={index} href={dropdownItem.href}>
                                <div className="px-5 py-3 text-sm text-white hover:text-cyan-400 hover:bg-cyan-500/20 cursor-pointer transition-all duration-200 border-l-3 border-transparent hover:border-cyan-400">
                                  {dropdownItem.label}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          /* Single column layout for simpler menus */
                          <div className="py-3">
                            {item.dropdown.map((dropdownItem, index) => (
                              <div key={index}>
                                {dropdownItem.isHeader ? (
                                  <div className="px-5 py-3 text-xs font-bold text-cyan-400 uppercase tracking-wider border-t border-cyan-500/20 mt-2 first:mt-0 first:border-t-0 bg-cyan-500/20">
                                    {dropdownItem.label}
                                  </div>
                                ) : (
                                  <Link href={dropdownItem.href}>
                                    <div className="px-5 py-3 text-sm text-white hover:text-cyan-400 hover:bg-cyan-500/20 cursor-pointer transition-all duration-200 border-l-3 border-transparent hover:border-cyan-400">
                                      {dropdownItem.label}
                                    </div>
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Dropdown Arrow */}
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-800 border-l-2 border-t-2 border-cyan-400/50 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <span className={`text-sm font-medium transition-colors hover:text-cyan-400 cursor-pointer ${
                      location === item.href ? "text-cyan-400" : "text-gray-300"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-xs text-gray-400">
              <Link href="/dashboard">
                <span className="hover:text-cyan-400 transition-colors cursor-pointer">Client Login</span>
              </Link>
            </div>
            <Link href="/security-scanner">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Free Scan
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-surface">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.dropdown ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400"
                        onClick={() => handleDropdownToggle(item.label)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`} />
                      </button>
                      {openDropdown === item.label && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((dropdownItem, index) => (
                            <div key={index}>
                              {dropdownItem.isHeader ? (
                                <div className="px-3 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                                  {dropdownItem.label}
                                </div>
                              ) : (
                                <Link href={dropdownItem.href}>
                                  <div 
                                    className="block px-3 py-2 text-sm text-gray-400 hover:text-cyan-400 cursor-pointer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {dropdownItem.label}
                                  </div>
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href}>
                      <div 
                        className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-cyan-400 cursor-pointer ${
                          location === item.href ? "text-cyan-400" : "text-gray-300"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="w-full text-gray-300 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link href="/security-scanner">
                  <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Free Scan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}