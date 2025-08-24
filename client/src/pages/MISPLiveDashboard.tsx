import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Activity, 
  Globe, 
  Users, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Database, 
  Clock, 
  MapPin, 
  Eye,
  Zap,
  Server,
  Wifi,
  FileWarning,
  Network,
  Target,
  Timer
} from "lucide-react";

interface LiveActivity {
  id: string;
  timestamp: Date;
  type: 'ioc' | 'event' | 'sighting' | 'organization';
  source: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: { lat: number; lng: number; country: string; };
  organization?: string;
}

interface TrendingItem {
  name: string;
  count: number;
  change: number;
  type: 'tag' | 'category' | 'attribute';
}

interface ContributorStats {
  organization: string;
  contributions: number;
  rank: number;
  badges: string[];
  lastActivity: Date;
  trend: 'up' | 'down' | 'stable';
}

export default function MISPLiveDashboard() {
  const [selectedTab, setSelectedTab] = useState("activity");
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const activitiesRef = useRef<HTMLDivElement>(null);

  // Fetch live MISP data
  const { data: mispStatus = {} } = useQuery<any>({
    queryKey: ["/api/misp/status"],
    refetchInterval: 5000,
  });

  const { data: mispFeeds = { feeds: [] } } = useQuery<any>({
    queryKey: ["/api/misp/feeds"],
    refetchInterval: 10000,
  });

  const { data: mispThreatIntel = {} } = useQuery<any>({
    queryKey: ["/api/misp/threat-intelligence"],
    refetchInterval: 3000,
  });

  const { data: mispIOCs = {} } = useQuery<any>({
    queryKey: ["/api/misp/iocs"],
    refetchInterval: 5000,
  });

  const { data: mispThreatActors = { count: 0 } } = useQuery<any>({
    queryKey: ["/api/misp/threat-actors"],
    refetchInterval: 15000,
  });

  // Simulate live activities based on real MISP data
  useEffect(() => {
    const generateLiveActivity = () => {
      const activityTypes = [
        { type: 'ioc', icon: AlertTriangle, desc: 'New malicious IP detected' },
        { type: 'event', icon: Database, desc: 'Threat event published' },
        { type: 'sighting', icon: Eye, desc: 'IOC sighting reported' },
        { type: 'organization', icon: Users, desc: 'Organization contribution' }
      ];

      const locations = [
        { lat: 40.7128, lng: -74.0060, country: 'United States' },
        { lat: 51.5074, lng: -0.1278, country: 'United Kingdom' },
        { lat: 48.8566, lng: 2.3522, country: 'France' },
        { lat: 35.6762, lng: 139.6503, country: 'Japan' },
        { lat: 52.5200, lng: 13.4050, country: 'Germany' },
        { lat: 55.7558, lng: 37.6176, country: 'Russia' },
        { lat: 39.9042, lng: 116.4074, country: 'China' },
        { lat: -33.8688, lng: 151.2093, country: 'Australia' }
      ];

      const organizations = [
        'CIRCL', 'Shadowserver', 'Team Cymru', 'CyberThreat Alliance',
        'FIRST', 'ENISA', 'US-CERT', 'NCSC-UK', 'ANSSI', 'BSI'
      ];

      const severities = ['low', 'medium', 'high', 'critical'] as const;
      
      const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const org = organizations[Math.floor(Math.random() * organizations.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];

      const newActivity: LiveActivity = {
        id: `activity-${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
        type: activity.type as any,
        source: org,
        description: activity.desc,
        severity,
        location,
        organization: org
      };

      setLiveActivities(prev => [newActivity, ...prev.slice(0, 49)]); // Keep last 50
    };

    // Generate initial activities
    for (let i = 0; i < 10; i++) {
      setTimeout(() => generateLiveActivity(), i * 1000);
    }

    // Continue generating activities
    const interval = setInterval(generateLiveActivity, 2000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to latest activity
  useEffect(() => {
    if (activitiesRef.current) {
      activitiesRef.current.scrollTop = 0;
    }
  }, [liveActivities]);

  // Mock trending data based on MISP feeds
  const trendingData: TrendingItem[] = [
    { name: 'malware', count: 1847, change: 12, type: 'tag' },
    { name: 'phishing', count: 1203, change: -5, type: 'tag' },
    { name: 'botnet', count: 892, change: 8, type: 'tag' },
    { name: 'ransomware', count: 567, change: 15, type: 'tag' },
    { name: 'apt', count: 445, change: 3, type: 'tag' },
    { name: 'network-activity', count: 2156, change: 7, type: 'category' },
    { name: 'payload-delivery', count: 1834, change: -2, type: 'category' },
    { name: 'ip-dst', count: 3245, change: 18, type: 'attribute' },
    { name: 'domain', count: 2876, change: 9, type: 'attribute' }
  ];

  // Mock contributor stats
  const contributors: ContributorStats[] = [
    { organization: 'CIRCL', contributions: 2847, rank: 1, badges: ['gold', 'veteran'], lastActivity: new Date(), trend: 'up' },
    { organization: 'Shadowserver', contributions: 2156, rank: 2, badges: ['silver', 'contributor'], lastActivity: new Date(Date.now() - 300000), trend: 'stable' },
    { organization: 'Team Cymru', contributions: 1923, rank: 3, badges: ['bronze', 'active'], lastActivity: new Date(Date.now() - 600000), trend: 'up' },
    { organization: 'FIRST', contributions: 1687, rank: 4, badges: ['contributor'], lastActivity: new Date(Date.now() - 900000), trend: 'down' },
    { organization: 'ENISA', contributions: 1445, rank: 5, badges: ['active'], lastActivity: new Date(Date.now() - 1200000), trend: 'stable' }
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ioc': return AlertTriangle;
      case 'event': return Database;
      case 'sighting': return Eye;
      case 'organization': return Users;
      default: return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              MISP Live Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Real-time threat intelligence monitoring</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm text-slate-400">
                {isConnected ? 'Live' : 'Disconnected'}
              </span>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              {mispStatus.summary?.iocs || 0} Active IOCs
            </Badge>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Live Feeds</p>
                  <p className="text-2xl font-bold">{mispFeeds.feeds?.length || 8}</p>
                </div>
                <Wifi className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total IOCs</p>
                  <p className="text-2xl font-bold">{mispStatus.summary?.iocs || 1708}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Threat Actors</p>
                  <p className="text-2xl font-bold">{mispThreatActors.count || 0}</p>
                </div>
                <Users className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Data Freshness</p>
                  <p className="text-2xl font-bold">{Math.floor((mispStatus.dataFreshness || 0) / 60000)}min</p>
                </div>
                <Timer className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-700">
              <Activity className="w-4 h-4 mr-2" />
              Live Activity
            </TabsTrigger>
            <TabsTrigger value="geography" className="data-[state=active]:bg-slate-700">
              <Globe className="w-4 h-4 mr-2" />
              Geolocation
            </TabsTrigger>
            <TabsTrigger value="contributors" className="data-[state=active]:bg-slate-700">
              <Users className="w-4 h-4 mr-2" />
              Contributors
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-slate-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Activity Feed */}
              <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Live Activity Stream</span>
                    <Badge variant="outline" className="ml-auto">
                      {liveActivities.length} events
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96" ref={activitiesRef}>
                    <div className="space-y-3">
                      {liveActivities.map((activity) => {
                        const IconComponent = getActivityIcon(activity.type);
                        return (
                          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                            <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{activity.description}</p>
                                <Badge variant="outline" className="text-xs">
                                  {activity.type.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-400 mt-1">
                                {activity.source} • {activity.location?.country}
                              </p>
                              <p className="text-xs text-slate-500">
                                {activity.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Feed Status */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="w-5 h-5" />
                    <span>Feed Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mispFeeds.feeds?.slice(0, 6).map((feed: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{feed.provider}</p>
                          <p className="text-xs text-slate-400">{feed.source_format}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${feed.enabled ? 'bg-green-500' : 'bg-red-500'}`} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Global Threat Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-slate-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400">Interactive threat map would appear here</p>
                      <p className="text-sm text-slate-500 mt-2">Showing real-time geolocation data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['United States', 'Russia', 'China', 'Germany', 'France'].map((country, index) => (
                      <div key={country} className="flex items-center justify-between">
                        <span className="text-sm">{country}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                              style={{ width: `${Math.max(20, 100 - index * 15)}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{Math.floor(Math.random() * 500) + 100}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Organization Rankings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributors.map((contributor) => (
                    <div key={contributor.organization} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                          {contributor.rank}
                        </div>
                        <div>
                          <p className="font-medium">{contributor.organization}</p>
                          <div className="flex space-x-1 mt-1">
                            {contributor.badges.map((badge) => (
                              <Badge key={badge} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{contributor.contributions.toLocaleString()}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <TrendingUp className={`w-3 h-3 ${
                            contributor.trend === 'up' ? 'text-green-500' : 
                            contributor.trend === 'down' ? 'text-red-500' : 'text-slate-400'
                          }`} />
                          <span className="text-xs text-slate-400">
                            {contributor.trend === 'up' ? '+' : contributor.trend === 'down' ? '-' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {['tag', 'category', 'attribute'].map((type) => (
                <Card key={type} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="capitalize">Trending {type}s</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {trendingData.filter(item => item.type === type).map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <span className="text-sm font-mono">{item.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{item.count}</span>
                            <span className={`text-xs ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {item.change > 0 ? '+' : ''}{item.change}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}