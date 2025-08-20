import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Bot, Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/solutions", label: "Solutions" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security-scanner", label: "Security Scanner" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/news", label: "News" }
  ];

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
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  location === item.href 
                    ? "text-cyan-400" 
                    : "text-gray-300"
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/security-scanner">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                Free Scan
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-surface">
            <div className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span 
                    className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-cyan-400 ${
                      location === item.href 
                        ? "text-cyan-400" 
                        : "text-gray-300"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
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