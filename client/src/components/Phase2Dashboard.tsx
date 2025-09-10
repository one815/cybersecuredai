/**
 * Phase 2: Revolutionary Cypher AI Dual Intelligence System Dashboard
 * 
 * Displays real-time status of:
 * - Neural Architecture Search (NAS)
 * - Meeting Intelligence with OpenAI transcription
 * - Enhanced Federated Learning
 * - Genetic Algorithm evolution
 */

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Bot, 
  Network, 
  Zap, 
  Activity, 
  Users, 
  Target,
  TrendingUp,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Eye,
  Mic,
  Monitor,
  Globe,
  Shield,
  Lock
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import cypherAiGenImage from '@assets/Cypher AI Gen_1757277451468.jpg';
import cypherAiAssistImage from '@assets/Cypher AI Assist_1757277458129.jpg';

interface Phase2DashboardProps {
  className?: string;
}

export function Phase2Dashboard({ className = "" }: Phase2DashboardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSector, setSelectedSector] = useState<string>('FERPA');

  // Fetch comprehensive system status
  const { data: systemStatus, isLoading: systemLoading } = useQuery({
    queryKey: ['/api/cypher-ai-system/comprehensive-status'],
    refetchInterval: 10000, // Update every 10 seconds
  });

  // Fetch NAS status
  const { data: nasStatus, isLoading: nasLoading } = useQuery({
    queryKey: ['/api/nas/status'],
    refetchInterval: 5000,
  });

  // Fetch Meeting Intelligence status
  const { data: meetingStatus, isLoading: meetingLoading } = useQuery({
    queryKey: ['/api/meeting-intelligence/status'],
    refetchInterval: 5000,
  });

  // Fetch Federated Learning status
  const { data: federatedStatus, isLoading: federatedLoading } = useQuery({
    queryKey: ['/api/federated-learning/status'],
    refetchInterval: 10000,
  });

  // Fetch sector-specific performance
  const { data: sectorPerformance, isLoading: sectorLoading } = useQuery({
    queryKey: ['/api/genetic-algorithm/sector-performance', selectedSector],
    refetchInterval: 15000,
  });

  // Start/Stop NAS mutations
  const startNAS = useMutation({
    mutationFn: () => apiRequest('/api/nas/start-search', { method: 'POST' }),
    onSuccess: () => {
      toast({ title: "Neural Architecture Search Started", description: "Self-modifying AI structures are now evolving." });
      queryClient.invalidateQueries({ queryKey: ['/api/nas/status'] });
    },
    onError: (error: any) => {
      toast({ title: "Failed to start NAS", description: error.message, variant: "destructive" });
    }
  });

  const stopNAS = useMutation({
    mutationFn: () => apiRequest('/api/nas/stop-search', { method: 'POST' }),
    onSuccess: () => {
      toast({ title: "Neural Architecture Search Stopped", description: "Evolution process has been paused." });
      queryClient.invalidateQueries({ queryKey: ['/api/nas/status'] });
    }
  });

  // Initiate federated learning round
  const initiateFederatedRound = useMutation({
    mutationFn: () => apiRequest('/api/federated-learning/initiate-round', { method: 'POST' }),
    onSuccess: () => {
      toast({ title: "Federated Learning Round Started", description: "Cross-environment knowledge sharing initiated." });
      queryClient.invalidateQueries({ queryKey: ['/api/federated-learning/status'] });
    }
  });

  const sectors = ['FERPA', 'FISMA', 'CIPA', 'GENERAL'];

  if (systemLoading || nasLoading || meetingLoading || federatedLoading) {
    return (
      <div className={`p-6 space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const overallAccuracy = systemStatus?.data?.overallAccuracy || 0;
  const systemHealth = systemStatus?.data?.systemHealth || 'unknown';
  const nasData = nasStatus?.data || {};
  const meetingData = meetingStatus?.data || {};
  const federatedData = federatedStatus?.data || {};

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header with AI Visual References */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          {/* Cypher AI Gen Visual Reference */}
          <div className="flex items-center space-x-4">
            <img 
              src={cypherAiGenImage} 
              alt="Cypher AI Genetic Model" 
              className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-cyan-400">Cypher AI Gen</h3>
              <p className="text-cyan-300 text-sm">Genetic Evolution Model</p>
            </div>
          </div>
          
          {/* Cypher AI Assistant Visual Reference */}
          <div className="flex items-center space-x-4">
            <img 
              src={cypherAiAssistImage} 
              alt="Cypher AI Assistant" 
              className="w-16 h-16 rounded-full border-2 border-blue-400 shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-blue-400">Cypher AI Assist</h3>
              <p className="text-blue-300 text-sm">Operations Automation</p>
            </div>
          </div>
        </div>
        
        <Badge 
          variant={systemHealth === 'optimal' ? 'default' : systemHealth === 'good' ? 'secondary' : 'destructive'}
          className="text-lg px-4 py-2 bg-orange-500 text-white border-orange-600"
        >
          {systemHealth.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>
      
      {/* Main Title */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          🧬 Revolutionary Cypher AI Dual Intelligence System
        </h2>
        <p className="text-cyan-300 text-lg">
          Phase 2: Self-evolving genetic algorithms with neural architecture search, meeting intelligence, and federated learning
        </p>
      </div>

      {/* Overall System Status */}
      <Card className="border-2 border-cyan-400 bg-gradient-to-r from-slate-800 to-slate-900 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Target className="w-6 h-6 text-cyan-400" />
            <span>System-wide Accuracy Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">Target: 99.2% Accuracy</span>
              <span className="text-3xl font-bold text-cyan-400">{overallAccuracy.toFixed(2)}%</span>
            </div>
            <Progress value={(overallAccuracy / 99.2) * 100} className="h-4 bg-slate-700" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {sectors.map((sector) => {
                const sectorData = systemStatus?.data?.performanceMetrics?.[sector];
                return (
                  <div key={sector} className="p-3 bg-slate-700 rounded-lg shadow-sm border border-cyan-500/30">
                    <div className="text-xs text-cyan-300 font-medium">{sector}</div>
                    <div className="text-lg font-bold text-cyan-400">
                      {sectorData?.accuracy?.toFixed(1) || '0.0'}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="nas" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-cyan-500/30">
          <TabsTrigger value="nas" className="flex items-center space-x-2 text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Brain className="w-4 h-4" />
            <span>Neural Architecture Search</span>
          </TabsTrigger>
          <TabsTrigger value="meeting" className="flex items-center space-x-2 text-white data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Mic className="w-4 h-4" />
            <span>Meeting Intelligence</span>
          </TabsTrigger>
          <TabsTrigger value="federated" className="flex items-center space-x-2 text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Network className="w-4 h-4" />
            <span>Federated Learning</span>
          </TabsTrigger>
          <TabsTrigger value="genetic" className="flex items-center space-x-2 text-white data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
            <Zap className="w-4 h-4" />
            <span>Genetic Evolution</span>
          </TabsTrigger>
        </TabsList>

        {/* Neural Architecture Search Tab */}
        <TabsContent value="nas" className="space-y-4">
          <Card className="bg-slate-800 border border-purple-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center space-x-2 text-white">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>Neural Architecture Search Engine</span>
              </CardTitle>
              <div className="flex space-x-2">
                {nasData.isActive ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => stopNAS.mutate()}
                    disabled={stopNAS.isPending}
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Search
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={() => startNAS.mutate()}
                    disabled={startNAS.isPending}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Search
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sectors.map((sector) => {
                  const sectorData = nasData.sectors?.[sector] || {};
                  return (
                    <Card key={sector} className="p-4 bg-slate-700 border border-purple-500/30">
                      <div className="text-center">
                        <h4 className="font-semibold text-lg text-white">{sector}</h4>
                        <div className="mt-2 space-y-2">
                          <div>
                            <span className="text-xs text-purple-300">Best Accuracy</span>
                            <div className="text-xl font-bold text-purple-400">
                              {sectorData.bestAccuracy?.toFixed(1) || '0.0'}%
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-purple-300">Architectures</span>
                            <div className="text-lg font-semibold text-white">
                              {sectorData.totalArchitectures || 0}
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-purple-300">Complexity</span>
                            <div className="text-sm text-white">
                              {sectorData.averageComplexity?.toFixed(0) || '0'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
              <div className="mt-4 p-4 bg-purple-900/50 rounded-lg border border-purple-500/30">
                <p className="text-sm text-purple-200">
                  <strong className="text-purple-400">Status:</strong> {nasData.isActive ? 'Actively evolving neural architectures' : 'Search paused'} | 
                  <strong className="text-purple-400"> Generation:</strong> {nasData.generation || 0} | 
                  <strong className="text-purple-400"> Total Architectures:</strong> {Object.values(nasData.sectors || {}).reduce((sum: number, sector: any) => sum + (sector.totalArchitectures || 0), 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meeting Intelligence Tab */}
        <TabsContent value="meeting" className="space-y-4">
          <Card className="bg-slate-800 border border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Mic className="w-5 h-5 text-green-400" />
                <span>Meeting Intelligence with OpenAI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-700 rounded-lg border border-green-500/30">
                  <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${meetingData.isInitialized ? 'text-green-400' : 'text-gray-400'}`} />
                  <h4 className="font-semibold text-white">Service Status</h4>
                  <p className="text-sm text-green-300">
                    {meetingData.isInitialized ? 'Initialized & Ready' : 'Not Initialized'}
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700 rounded-lg border border-blue-500/30">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <h4 className="font-semibold text-white">Active Sessions</h4>
                  <p className="text-2xl font-bold text-blue-400">{meetingData.activeSessions || 0}</p>
                </div>
                <div className="text-center p-4 bg-slate-700 rounded-lg border border-orange-500/30">
                  <Bot className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <h4 className="font-semibold text-white">AI Capabilities</h4>
                  <p className="text-sm text-orange-300">Real-time transcription & analysis</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(meetingData.capabilities || {}).map(([key, enabled]) => (
                  <div key={key} className="flex items-center space-x-2">
                    {enabled ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm capitalize text-white">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-green-900/50 rounded-lg border border-green-500/30">
                <p className="text-sm text-green-200">
                  <strong className="text-green-400">OpenAI Integration:</strong> GPT-5 model with Whisper transcription | 
                  <strong className="text-green-400"> Languages:</strong> {meetingData.configuration?.language || 'en'} | 
                  <strong className="text-green-400"> Compliance Mode:</strong> {meetingData.configuration?.complianceMode ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Federated Learning Tab */}
        <TabsContent value="federated" className="space-y-4">
          <Card className="bg-slate-800 border border-blue-500/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center space-x-2 text-white">
                <Network className="w-5 h-5 text-blue-400" />
                <span>Enhanced Federated Learning</span>
              </CardTitle>
              <Button 
                size="sm" 
                onClick={() => initiateFederatedRound.mutate()}
                disabled={initiateFederatedRound.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Initiate Round
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700 rounded-lg border border-blue-500/30">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <h4 className="font-semibold text-white">Total Nodes</h4>
                  <p className="text-2xl font-bold text-blue-400">{federatedData.data?.metrics?.totalNodes || 0}</p>
                </div>
                <div className="text-center p-4 bg-slate-700 rounded-lg border border-green-500/30">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <h4 className="font-semibold text-white">Active Nodes</h4>
                  <p className="text-2xl font-bold text-green-400">{federatedData.data?.metrics?.activeNodes || 0}</p>
                </div>
                <div className="text-center p-4 bg-slate-700 rounded-lg border border-purple-500/30">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <h4 className="font-semibold text-white">Trust Score</h4>
                  <p className="text-xl font-bold text-purple-400">
                    {((federatedData.data?.metrics?.averageTrustScore || 0) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-700 rounded-lg border border-orange-500/30">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <h4 className="font-semibold text-white">Privacy Score</h4>
                  <p className="text-xl font-bold text-orange-400">
                    {((federatedData.data?.metrics?.privacyPreservationScore || 0) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Federated Nodes */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Federated Network Nodes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {federatedData.data?.nodeStatus?.map((node: any) => (
                    <Card key={node.nodeId} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold">{node.organization}</h5>
                          <p className="text-sm text-gray-600">{node.sector}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={node.status === 'active' ? 'default' : 'secondary'}>
                            {node.status}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">
                            Trust: {(node.trustScore * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Status:</strong> {federatedData.data?.isActive ? 'Active cross-environment learning' : 'Inactive'} | 
                  <strong> Current Round:</strong> {federatedData.data?.currentRound || 'None'} | 
                  <strong> Convergence:</strong> {((federatedData.data?.metrics?.convergenceRate || 0) * 100).toFixed(1)}%
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Genetic Evolution Tab */}
        <TabsContent value="genetic" className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-white">Select Compliance Sector:</label>
            <div className="flex space-x-2">
              {sectors.map((sector) => (
                <Button
                  key={sector}
                  variant={selectedSector === sector ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSector(sector)}
                  className={selectedSector === sector ? "bg-yellow-600 hover:bg-yellow-700" : "border-yellow-500 text-yellow-400 hover:bg-yellow-600"}
                >
                  {sector}
                </Button>
              ))}
            </div>
          </div>

          <Card className="bg-slate-800 border border-yellow-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2 text-white">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Genetic Algorithm Evolution - {selectedSector}</span>
                </CardTitle>
                
                {/* Dual AI System Visual */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={cypherAiGenImage} 
                      alt="Cypher AI Genetic Model" 
                      className="w-10 h-10 rounded-full border border-cyan-400"
                    />
                    <span className="text-cyan-400 text-sm font-medium">Gen Model</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={cypherAiAssistImage} 
                      alt="Cypher AI Assistant" 
                      className="w-10 h-10 rounded-full border border-blue-400"
                    />
                    <span className="text-blue-400 text-sm font-medium">AI Assist</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {sectorLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-700 rounded-lg border border-yellow-500/30">
                      <Target className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                      <h4 className="font-semibold text-white">Current Accuracy</h4>
                      <p className="text-2xl font-bold text-yellow-400">
                        {sectorPerformance?.data?.currentAccuracy?.toFixed(2) || '0.00'}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-700 rounded-lg border border-green-500/30">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      <h4 className="font-semibold text-white">Progress to Target</h4>
                      <p className="text-xl font-bold text-green-400">
                        {sectorPerformance?.data?.accuracyProgress?.toFixed(1) || '0.0'}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-700 rounded-lg border border-blue-500/30">
                      <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                      <h4 className="font-semibold text-white">Best Individuals</h4>
                      <p className="text-xl font-bold text-blue-400">
                        {sectorPerformance?.data?.bestIndividuals?.length || 0}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Evolution Progress</h4>
                    <Progress 
                      value={sectorPerformance?.data?.accuracyProgress || 0} 
                      className="h-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                      <span>Current: {sectorPerformance?.data?.currentAccuracy?.toFixed(2) || '0.00'}%</span>
                      <span>Target: 99.2%</span>
                    </div>
                  </div>

                  {sectorPerformance?.data?.bestArchitectures?.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Top Neural Architectures</h4>
                      <div className="space-y-2">
                        {sectorPerformance.data.bestArchitectures.slice(0, 3).map((arch: any, index: number) => (
                          <div key={arch.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                            <div>
                              <span className="font-medium">Architecture #{index + 1}</span>
                              <div className="text-sm text-gray-600">
                                {arch.layers?.length || 0} layers, Complexity: {arch.complexity?.toFixed(0) || 0}
                              </div>
                            </div>
                            <Badge variant="secondary">
                              {arch.performance?.accuracy?.toFixed(2) || '0.00'}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}