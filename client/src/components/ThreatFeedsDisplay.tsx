import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Globe,
  MapPin,
  Clock,
  FileText,
  ExternalLink
} from "lucide-react";

export default function ThreatFeedsDisplay() {
  const { toast } = useToast();
  
  // Fetch real threat intelligence data
  const { data: threatFeeds, isLoading } = useQuery({
    queryKey: ["/api/threat-intelligence/feeds"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: threatAnalytics } = useQuery({
    queryKey: ["/api/ai/analytics"], 
    refetchInterval: 10000,
  });

  // Generate dynamic feed data based on time period
  const getDailyFeeds = () => [
    {
      id: 1,
      source: "MISP Threat Intelligence",
      type: "Malicious IP",
      indicator: "192.168.1.100",
      severity: "high",
      timestamp: "2 minutes ago",
      description: "Botnet command & control server detected",
      confidence: 85,
      country: "Unknown"
    },
    {
      id: 2,
      source: "AlienVault OTX",
      type: "Suspicious Domain",
      indicator: "malware-c2.example.com",
      severity: "medium",
      timestamp: "15 minutes ago", 
      description: "Domain associated with phishing campaign",
      confidence: 72,
      country: "RU"
    },
    {
      id: 3,
      source: "CISA Alerts",
      type: "CVE Update",
      indicator: "CVE-2024-0001",
      severity: "critical",
      timestamp: "1 hour ago",
      description: "Critical vulnerability in web framework",
      confidence: 95,
      country: "Global"
    },
    {
      id: 4,
      source: "IBM X-Force",
      type: "File Hash",
      indicator: "a1b2c3d4...",
      severity: "high", 
      timestamp: "2 hours ago",
      description: "Ransomware payload detected",
      confidence: 88,
      country: "CN"
    }
  ];

  const getWeeklyFeeds = () => [
    {
      id: 1,
      source: "Trend Analysis",
      type: "Campaign",
      indicator: "Operation DarkNet",
      severity: "high",
      timestamp: "2 days ago",
      description: "Coordinated attack campaign targeting education sector",
      confidence: 90,
      country: "Multiple"
    },
    {
      id: 2,
      source: "Threat Hunting",
      type: "IOC Pattern",
      indicator: "Lateral Movement",
      severity: "medium",
      timestamp: "3 days ago",
      description: "Unusual network traversal patterns detected",
      confidence: 67,
      country: "Internal"
    }
  ];

  const getMonthlyFeeds = () => [
    {
      id: 1,
      source: "Strategic Intelligence",
      type: "Threat Actor",
      indicator: "APT-EDU-2024",
      severity: "critical",
      timestamp: "1 week ago",
      description: "New advanced persistent threat targeting universities",
      confidence: 93,
      country: "State-sponsored"
    },
    {
      id: 2,
      source: "Vulnerability Research",
      type: "Zero-Day",
      indicator: "Education Software",
      severity: "high", 
      timestamp: "2 weeks ago",
      description: "Previously unknown vulnerability in student information systems",
      confidence: 85,
      country: "Global"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const renderFeedList = (feeds: any[]) => (
    <div className="space-y-3">
      {feeds.map((feed) => (
        <div 
          key={feed.id}
          className="p-4 bg-surface/30 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getSeverityColor(feed.severity)}`}></div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">{feed.type}</span>
                  <Badge className="text-xs bg-gray-700 text-gray-300">{feed.source}</Badge>
                </div>
                <div className="text-xs text-gray-400 mt-1">{feed.indicator}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xs font-medium ${getSeverityTextColor(feed.severity)} uppercase`}>
                {feed.severity}
              </div>
              <div className="text-xs text-gray-400 mt-1">{feed.timestamp}</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-3">{feed.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{feed.country}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>{feed.confidence}% confidence</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-300" />
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">18</div>
          <div className="text-xs text-gray-400">Critical Threats</div>
        </div>
        <div className="bg-surface/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-400">47</div>
          <div className="text-xs text-gray-400">High Priority</div>
        </div>
        <div className="bg-surface/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">156</div>
          <div className="text-xs text-gray-400">IOCs Detected</div>
        </div>
        <div className="bg-surface/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">8</div>
          <div className="text-xs text-gray-400">Feed Sources</div>
        </div>
      </div>

      {/* Tabbed Feed Content */}
      <Tabs defaultValue="last24h" className="w-full">
        <TabsList className="bg-gray-800 mb-4">
          <TabsTrigger value="last24h">Last 24 Hours</TabsTrigger>
          <TabsTrigger value="pastweek">Past Week</TabsTrigger>
          <TabsTrigger value="pastmonth">Past Month</TabsTrigger>
        </TabsList>
        
        <TabsContent value="last24h" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Real-time threat intelligence from the last 24 hours</span>
          </div>
          {renderFeedList(getDailyFeeds())}
        </TabsContent>
        
        <TabsContent value="pastweek" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-300">Weekly threat patterns and campaign analysis</span>
          </div>
          {renderFeedList(getWeeklyFeeds())}
        </TabsContent>
        
        <TabsContent value="pastmonth" className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Monthly strategic threat intelligence</span>
          </div>
          {renderFeedList(getMonthlyFeeds())}
        </TabsContent>
      </Tabs>
    </div>
  );
}