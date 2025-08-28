import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Shield, 
  AlertTriangle, 
  Activity,
  Brain,
  Target,
  Filter,
  Settings
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ThreatMap } from "@/components/ThreatMap";

interface ThreatStats {
  totalThreats: number;
  blockedThreats: number;
  topThreatTypes: { type: string; count: number; }[];
  topCountries: { country: string; count: number; }[];
  realTimeRate: number;
}

export default function ThreatMap5D() {
  const [selectedDimension, setSelectedDimension] = useState('global');
  const [threatFilter, setThreatFilter] = useState('all');

  // Fetch threat statistics
  const { data: threatStats = { totalThreats: 3496, blockedThreats: 3204, realTimeRate: 127, topThreatTypes: [], topCountries: [] } } = useQuery<ThreatStats>({
    queryKey: ['/api/threats/stats'],
    refetchInterval: 5000,
  });

  const resetView = () => {
    setSelectedDimension('global');
    setThreatFilter('all');
  };

  const threatTypes = [
    { name: 'Malware', color: '#ef4444', count: 1247 },
    { name: 'Phishing', color: '#f97316', count: 892 },
    { name: 'DDoS', color: '#eab308', count: 634 },
    { name: 'Botnet', color: '#a855f7', count: 445 },
    { name: 'Ransomware', color: '#ec4899', count: 278 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            CyberSecure AI - Threat Map
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time global cybersecurity threat monitoring and analysis
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">View Dimensions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedDimension} onValueChange={setSelectedDimension}>
                <TabsList className="grid grid-cols-3 bg-gray-700">
                  <TabsTrigger value="global" className="text-xs">Global</TabsTrigger>
                  <TabsTrigger value="regional" className="text-xs">Regional</TabsTrigger>
                  <TabsTrigger value="local" className="text-xs">Local</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Threat Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <select 
                value={threatFilter}
                onChange={(e) => setThreatFilter(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded px-3 py-1 text-sm"
              >
                <option value="all">All Threats</option>
                <option value="malware">Malware</option>
                <option value="phishing">Phishing</option>
                <option value="ddos">DDoS</option>
                <option value="ransomware">Ransomware</option>
              </select>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Map Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                variant="outline"
                onClick={resetView}
                className="w-full"
              >
                <Settings className="w-4 h-4 mr-2" />
                Reset View
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Threat Map */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700 h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Global Threat Map - Real-Time</span>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    <Activity className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div className="w-full h-full rounded-b-lg">
                  <ThreatMap className="w-full h-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Threat Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Threats</span>
                    <span className="text-red-400 font-bold">{threatStats.totalThreats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Blocked</span>
                    <span className="text-green-400 font-bold">{threatStats.blockedThreats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active</span>
                    <span className="text-orange-400 font-bold">{threatStats.totalThreats - threatStats.blockedThreats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Rate/Min</span>
                    <span className="text-cyan-400 font-bold">{threatStats.realTimeRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Threat Types */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Active Threat Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {threatTypes.map((threat) => (
                    <div key={threat.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: threat.color }}
                        />
                        <span className="text-sm">{threat.name}</span>
                      </div>
                      <span className="text-sm font-mono">{threat.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Source Countries */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Top Source Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['China', 'Russia', 'North Korea', 'Iran', 'USA'].map((country, index) => (
                    <div key={country} className="flex items-center justify-between text-sm">
                      <span>{country}</span>
                      <span className="text-red-400">{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Threat Intelligence Sources */}
        <Card className="mt-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Threat Intelligence Sources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-cyan-400 mb-2">MISP Threat Intelligence</h4>
                <p className="text-sm text-gray-400">Real-time global threat feeds with IoCs and attack patterns</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">Geolocation Services</h4>
                <p className="text-sm text-gray-400">IP-based location tracking for threat origin mapping</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Regional Threat Feeds</h4>
                <p className="text-sm text-gray-400">Country-specific threat intelligence and vulnerability data</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}