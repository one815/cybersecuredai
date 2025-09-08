/**
 * External Integrations Dashboard
 * Phase 3: Social Platforms, Calendar Optimization, and Communication Tracking
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Mail, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Target,
  Zap,
  Globe,
  Shield,
  Activity
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface IntegrationStatus {
  platform: string;
  configured: boolean;
  connected: boolean;
  lastActivity: string;
  metrics: {
    messagesProcessed: number;
    engagementRate: number;
    effectiveness: number;
  };
}

interface SocialAnalytics {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  posts: number;
  leads: number;
}

interface CalendarMetrics {
  meetingsScheduled: number;
  conflictsResolved: number;
  efficiencyGain: number;
  focusTimeProtected: number;
}

interface CommunicationData {
  emailsTracked: number;
  openRate: number;
  clickRate: number;
  meetingsTranscribed: number;
  responseTime: number;
}

export default function ExternalIntegrationsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch integration status
  const { data: integrationStatus, isLoading: statusLoading } = useQuery<IntegrationStatus[]>({
    queryKey: ['/api/integrations/status'],
  });

  // Fetch social analytics
  const { data: socialAnalytics, isLoading: socialLoading } = useQuery<SocialAnalytics[]>({
    queryKey: ['/api/integrations/social/analytics'],
  });

  // Fetch calendar metrics
  const { data: calendarMetrics, isLoading: calendarLoading } = useQuery<CalendarMetrics>({
    queryKey: ['/api/integrations/calendar/metrics'],
  });

  // Fetch communication data
  const { data: communicationData, isLoading: communicationLoading } = useQuery<CommunicationData>({
    queryKey: ['/api/integrations/communication/analytics'],
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-2">External Integrations</h1>
            <p className="text-slate-400">Phase 3: Social Platforms, Calendar Optimization & Communication Tracking</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
              data-testid="button-refresh-integrations"
            >
              <Activity className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              data-testid="button-configure-integrations"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Integration Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-900 border-slate-800" data-testid="card-social-platforms">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-blue-400" />
                Social Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-1">3/3</div>
              <p className="text-xs text-slate-500">LinkedIn, Twitter, GitHub</p>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800" data-testid="card-calendar-sync">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                Calendar Sync
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400 mb-1">2/2</div>
              <p className="text-xs text-slate-500">Google, Outlook</p>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Optimized
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800" data-testid="card-communication-tracking">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green-400" />
                Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400 mb-1">95%</div>
              <p className="text-xs text-slate-500">Tracking Accuracy</p>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                  <Activity className="w-3 h-3 mr-1" />
                  Monitoring
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800" data-testid="card-meeting-intelligence">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-orange-400" />
                Meeting Intel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400 mb-1">3/3</div>
              <p className="text-xs text-slate-500">Zoom, Teams, Meet</p>
              <div className="mt-2">
                <Badge variant="secondary" className="bg-orange-600/20 text-orange-400">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-green-600"
              data-testid="tab-overview"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="social" 
              className="data-[state=active]:bg-blue-600"
              data-testid="tab-social"
            >
              <Globe className="w-4 h-4 mr-2" />
              Social Platforms
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="data-[state=active]:bg-purple-600"
              data-testid="tab-calendar"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendar Optimization
            </TabsTrigger>
            <TabsTrigger 
              value="communication" 
              className="data-[state=active]:bg-orange-600"
              data-testid="tab-communication"
            >
              <Mail className="w-4 h-4 mr-2" />
              Communication
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Real-time integration effectiveness
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Social Engagement</span>
                      <span className="text-blue-400">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Calendar Optimization</span>
                      <span className="text-purple-400">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Communication Tracking</span>
                      <span className="text-green-400">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Meeting Intelligence</span>
                      <span className="text-orange-400">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest integration events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3" data-testid="activity-linkedin-lead">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">New LinkedIn lead qualified</p>
                      <p className="text-xs text-slate-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3" data-testid="activity-calendar-optimized">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Calendar optimized - 3 conflicts resolved</p>
                      <p className="text-xs text-slate-500">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3" data-testid="activity-meeting-transcribed">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Meeting transcribed with 97% accuracy</p>
                      <p className="text-xs text-slate-500">12 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3" data-testid="activity-threat-detected">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Twitter threat intelligence alert</p>
                      <p className="text-xs text-slate-500">18 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Automated recommendations from Cypher AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Social Optimization</h4>
                    <p className="text-sm text-slate-300">
                      Post during 10 AM - 2 PM on Tue-Thu for 23% higher engagement
                    </p>
                  </div>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">Calendar Efficiency</h4>
                    <p className="text-sm text-slate-300">
                      Block 2-hour focus time during peak productivity hours for 35% efficiency gain
                    </p>
                  </div>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Communication</h4>
                    <p className="text-sm text-slate-300">
                      Personalize content based on engagement history for 45% better response rates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Platforms Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LinkedIn */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    LinkedIn
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                    Connected
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between" data-testid="linkedin-leads">
                    <span className="text-sm text-slate-400">Leads This Week</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between" data-testid="linkedin-engagement">
                    <span className="text-sm text-slate-400">Engagement Rate</span>
                    <span className="font-semibold text-green-400">14.2%</span>
                  </div>
                  <div className="flex justify-between" data-testid="linkedin-connections">
                    <span className="text-sm text-slate-400">New Connections</span>
                    <span className="font-semibold">47</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    data-testid="button-manage-linkedin"
                  >
                    Manage LinkedIn
                  </Button>
                </CardContent>
              </Card>

              {/* Twitter */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Twitter
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                    Monitoring
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between" data-testid="twitter-threats">
                    <span className="text-sm text-slate-400">Threat Alerts</span>
                    <span className="font-semibold text-orange-400">7</span>
                  </div>
                  <div className="flex justify-between" data-testid="twitter-mentions">
                    <span className="text-sm text-slate-400">Brand Mentions</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between" data-testid="twitter-reach">
                    <span className="text-sm text-slate-400">Weekly Reach</span>
                    <span className="font-semibold text-green-400">12.3k</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    data-testid="button-view-threats"
                  >
                    View Threats
                  </Button>
                </CardContent>
              </Card>

              {/* GitHub */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    GitHub
                  </CardTitle>
                  <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                    Scanning
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between" data-testid="github-repos">
                    <span className="text-sm text-slate-400">Repositories</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between" data-testid="github-vulnerabilities">
                    <span className="text-sm text-slate-400">Vulnerabilities</span>
                    <span className="font-semibold text-yellow-400">3</span>
                  </div>
                  <div className="flex justify-between" data-testid="github-security-score">
                    <span className="text-sm text-slate-400">Security Score</span>
                    <span className="font-semibold text-green-400">87%</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    data-testid="button-view-security"
                  >
                    View Security
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Social Media Analytics Chart */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-green-400">Social Media Analytics</CardTitle>
                <CardDescription>
                  Engagement trends across all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Interactive analytics chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Optimization Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar Metrics */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Optimization Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center" data-testid="calendar-efficiency">
                      <div className="text-2xl font-bold text-purple-400">35%</div>
                      <p className="text-xs text-slate-400">Efficiency Gain</p>
                    </div>
                    <div className="text-center" data-testid="calendar-conflicts">
                      <div className="text-2xl font-bold text-green-400">12</div>
                      <p className="text-xs text-slate-400">Conflicts Resolved</p>
                    </div>
                    <div className="text-center" data-testid="calendar-focus-time">
                      <div className="text-2xl font-bold text-blue-400">8.5h</div>
                      <p className="text-xs text-slate-400">Focus Time Protected</p>
                    </div>
                    <div className="text-center" data-testid="calendar-meetings">
                      <div className="text-2xl font-bold text-orange-400">47</div>
                      <p className="text-xs text-slate-400">Meetings Optimized</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Scheduling */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Smart Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Optimal Meeting Times</span>
                      <Badge variant="secondary" className="bg-green-600/20 text-green-400">
                        Tue-Thu 10 AM - 2 PM
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Meeting Length</span>
                      <span className="text-green-400">32 minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Buffer Time</span>
                      <span className="text-blue-400">15 minutes</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    data-testid="button-schedule-meeting"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Smart Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Schedule View */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-purple-400">Weekly Schedule Overview</CardTitle>
                <CardDescription>
                  AI-optimized calendar with protected focus time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Interactive calendar view would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Email Tracking */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Email Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between" data-testid="email-sent">
                    <span className="text-sm text-slate-400">Emails Sent</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between" data-testid="email-open-rate">
                    <span className="text-sm text-slate-400">Open Rate</span>
                    <span className="font-semibold text-green-400">68.3%</span>
                  </div>
                  <div className="flex justify-between" data-testid="email-click-rate">
                    <span className="text-sm text-slate-400">Click Rate</span>
                    <span className="font-semibold text-blue-400">23.7%</span>
                  </div>
                  <div className="flex justify-between" data-testid="email-reply-rate">
                    <span className="text-sm text-slate-400">Reply Rate</span>
                    <span className="font-semibold text-purple-400">12.1%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Meeting Intelligence */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Meeting Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between" data-testid="meetings-transcribed">
                    <span className="text-sm text-slate-400">Meetings Transcribed</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between" data-testid="transcription-accuracy">
                    <span className="text-sm text-slate-400">Accuracy</span>
                    <span className="font-semibold text-green-400">95.2%</span>
                  </div>
                  <div className="flex justify-between" data-testid="action-items">
                    <span className="text-sm text-slate-400">Action Items</span>
                    <span className="font-semibold">234</span>
                  </div>
                  <div className="flex justify-between" data-testid="follow-ups-sent">
                    <span className="text-sm text-slate-400">Follow-ups Sent</span>
                    <span className="font-semibold text-blue-400">89</span>
                  </div>
                </CardContent>
              </Card>

              {/* Response Analytics */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Response Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between" data-testid="avg-response-time">
                    <span className="text-sm text-slate-400">Avg Response Time</span>
                    <span className="font-semibold text-green-400">2.3h</span>
                  </div>
                  <div className="flex justify-between" data-testid="engagement-score">
                    <span className="text-sm text-slate-400">Engagement Score</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between" data-testid="leads-qualified">
                    <span className="text-sm text-slate-400">Leads Qualified</span>
                    <span className="font-semibold text-purple-400">43</span>
                  </div>
                  <div className="flex justify-between" data-testid="conversion-rate">
                    <span className="text-sm text-slate-400">Conversion Rate</span>
                    <span className="font-semibold text-orange-400">28.6%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Communication Timeline */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-green-400">Communication Timeline</CardTitle>
                <CardDescription>
                  Real-time tracking of all communication channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-slate-800 rounded-lg" data-testid="communication-email">
                    <Mail className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <p className="font-semibold">Email Campaign Sent</p>
                      <p className="text-sm text-slate-400">Security best practices newsletter - 1,247 recipients</p>
                    </div>
                    <span className="text-sm text-slate-500">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-slate-800 rounded-lg" data-testid="communication-meeting">
                    <MessageSquare className="w-5 h-5 text-orange-400" />
                    <div className="flex-1">
                      <p className="font-semibold">Meeting Transcribed</p>
                      <p className="text-sm text-slate-400">Cybersecurity review meeting - 97% accuracy</p>
                    </div>
                    <span className="text-sm text-slate-500">12 min ago</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-slate-800 rounded-lg" data-testid="communication-social">
                    <Users className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="font-semibold">Social Engagement</p>
                      <p className="text-sm text-slate-400">LinkedIn post received 47 engagements</p>
                    </div>
                    <span className="text-sm text-slate-500">28 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}