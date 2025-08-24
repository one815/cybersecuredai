import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  Activity, 
  ExternalLink,
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react";

export default function ThreatDetection() {
  const [, setLocation] = useLocation();

  const mockThreats = [
    {
      id: 1,
      type: "Malware Detection",
      severity: "HIGH",
      source: "Network Scanner",
      description: "Suspicious executable detected attempting to communicate with known C&C server",
      timestamp: "2 minutes ago",
      country: "Unknown",
      confidence: 87,
      indicator: "192.168.1.45:443"
    },
    {
      id: 2,
      type: "Phishing Attempt",
      severity: "MEDIUM",
      source: "Email Filter",
      description: "Email with suspicious links detected targeting multiple users",
      timestamp: "15 minutes ago",
      country: "Russia",
      confidence: 74,
      indicator: "malicious-site.example.com"
    },
    {
      id: 3,
      type: "Brute Force Attack",
      severity: "HIGH",
      source: "Authentication System",
      description: "Multiple failed login attempts detected from single IP address",
      timestamp: "32 minutes ago",
      country: "China",
      confidence: 92,
      indicator: "203.45.67.89"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400';
      case 'HIGH': return 'text-orange-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'LOW': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" style={{filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))'}} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Real-time Threat Detection</h1>
                <p className="text-gray-400">Monitor and respond to security threats in real-time</p>
              </div>
            </div>
            <Button 
              onClick={() => setLocation('/dashboard')}
              variant="outline"
              className="text-blue-400 border-blue-600 hover:bg-blue-900/50"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/50 border-red-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-400">18</div>
              <div className="text-sm text-gray-400">Critical Threats</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/50 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-400">47</div>
              <div className="text-sm text-gray-400">High Priority</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/50 border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-400">156</div>
              <div className="text-sm text-gray-400">IOCs Detected</div>
            </CardContent>
          </Card>
          <Card className="bg-surface/50 border-green-500/30">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-400">98.5%</div>
              <div className="text-sm text-gray-400">Detection Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Threats */}
        <Card className="bg-surface/30 border-gray-700/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-orange-400" />
                Active Threats
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Live</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockThreats.map((threat) => (
                <div
                  key={threat.id}
                  className="p-4 bg-surface/30 rounded-lg border border-gray-700/50 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`}></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-white">{threat.type}</span>
                          <Badge className="text-xs bg-gray-700 text-gray-300">{threat.source}</Badge>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{threat.indicator}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-medium ${getSeverityTextColor(threat.severity)} uppercase`}>
                        {threat.severity}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {threat.timestamp}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">{threat.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{threat.country}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{threat.confidence}% confidence</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        Investigate
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                        Block
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}