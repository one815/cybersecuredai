import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { 
  Trophy, 
  Award, 
  Star, 
  Crown, 
  Zap, 
  Shield, 
  Target, 
  TrendingUp,
  RefreshCw,
  GraduationCap,
  ShieldCheck,
  Building,
  Book,
  ShieldAlert,
  PlayCircle,
  Repeat,
  Cloud,
  Sword,
  Medal,
  Gift,
  Sparkles,
  Users,
  BarChart,
  Calendar
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import BadgeDisplay from "@/components/BadgeDisplay";

const iconMap: Record<string, any> = {
  "graduation-cap": GraduationCap,
  "shield-check": ShieldCheck,
  "award": Award,
  "sword": Sword,
  "shield": Shield,
  "cloud": Cloud,
  "target": Target,
  "crown": Crown,
  "star": Star,
  "trending-up": TrendingUp,
  "repeat": Repeat,
  "refresh-cw": RefreshCw,
  "zap": Zap,
  "play-circle": PlayCircle,
  "book": Book,
  "building": Building,
  "shield-alert": ShieldAlert,
  "trophy": Trophy
};

const tierColors = {
  bronze: { bg: "bg-orange-900/30", text: "text-orange-400", border: "border-orange-500/50" },
  silver: { bg: "bg-gray-900/30", text: "text-gray-300", border: "border-gray-400/50" },
  gold: { bg: "bg-yellow-900/30", text: "text-yellow-400", border: "border-yellow-500/50" },
  platinum: { bg: "bg-cyan-900/30", text: "text-cyan-400", border: "border-cyan-500/50" },
  diamond: { bg: "bg-purple-900/30", text: "text-purple-400", border: "border-purple-500/50" }
};

interface BadgeDefinition {
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  category: string;
  frameworkId?: string;
  pointsValue: number;
}

interface BadgeProgress {
  badgeId: string;
  currentProgress: number;
  maxProgress: number;
  isComplete: boolean;
  nextMilestone?: string;
}

export default function Achievements() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedFramework, setSelectedFramework] = useState("ferpa");
  const [selectedScore, setSelectedScore] = useState(85);

  // Fetch user badges
  const { data: userBadges, isLoading: badgesLoading } = useQuery({
    queryKey: ['/api/badges/user', user?.id],
    enabled: !!user?.id,
  });

  // Fetch badge definitions
  const { data: badgeDefinitions, isLoading: definitionsLoading } = useQuery({
    queryKey: ['/api/badges/definitions'],
  });

  // Fetch badge progress
  const { data: badgeProgress, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/badges/progress', user?.id],
    enabled: !!user?.id,
  });

  // Fetch gamification stats
  const { data: gamificationStats } = useQuery({
    queryKey: ['/api/badges/stats'],
  });

  // Simulate assessment mutation
  const simulateAssessment = useMutation({
    mutationFn: async (data: { userId: string; frameworkId: string; score: number; previousScore?: number }) => {
      return await apiRequest('/api/badges/simulate-assessment', { method: 'POST', data: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/badges/user'] });
      queryClient.invalidateQueries({ queryKey: ['/api/badges/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/badges/stats'] });
    }
  });

  const handleSimulateAssessment = () => {
    if (!user?.id) return;
    
    simulateAssessment.mutate({
      userId: user.id,
      frameworkId: selectedFramework,
      score: selectedScore,
      previousScore: selectedScore - 20 // Simulate improvement
    });
  };

  const BadgeIcon = ({ iconName, tier }: { iconName: string, tier: string }) => {
    const IconComponent = iconMap[iconName] || Award;
    const colors = tierColors[tier as keyof typeof tierColors];
    return <IconComponent className={`w-6 h-6 ${colors.text}`} />;
  };

  if (badgesLoading || definitionsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6" data-testid="page-achievements">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Achievement Center</h1>
            <p className="text-sm sm:text-base text-gray-400">Track your compliance milestones and earn badges</p>
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 text-yellow-400 border-yellow-500/30 text-sm">
          Level {(userBadges as any)?.level || 1}
        </Badge>
      </div>

      {/* Achievement Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="holographic-card border border-yellow-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-white">{(userBadges as any)?.totalBadges || 0}</div>
            <div className="text-xs sm:text-sm text-gray-400">Total Badges</div>
          </CardContent>
        </Card>

        <Card className="holographic-card border border-cyan-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-white">{(userBadges as any)?.totalPoints || 0}</div>
            <div className="text-xs sm:text-sm text-gray-400">Achievement Points</div>
          </CardContent>
        </Card>

        <Card className="holographic-card border border-purple-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-white">{(userBadges as any)?.level || 1}</div>
            <div className="text-xs sm:text-sm text-gray-400">Achievement Level</div>
          </CardContent>
        </Card>

        <Card className="holographic-card border border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mx-auto mb-2" />
            <div className="text-lg sm:text-2xl font-bold text-white">{(badgeProgress as any)?.filter?.((p: BadgeProgress) => p.currentProgress > 0)?.length || 0}</div>
            <div className="text-xs sm:text-sm text-gray-400">In Progress</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earned" className="space-y-6">
        <TabsList className="bg-surface border border-surface-light flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="earned" className="data-[state=active]:bg-yellow-600 text-xs sm:text-sm flex-1 min-w-0">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">Earned</span>
          </TabsTrigger>
          <TabsTrigger value="available" className="data-[state=active]:bg-blue-600 text-xs sm:text-sm flex-1 min-w-0">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">Available</span>
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-green-600 text-xs sm:text-sm flex-1 min-w-0">
            <BarChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">Progress</span>
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600 text-xs sm:text-sm flex-1 min-w-0">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate sm:hidden">Leaders</span>
            <span className="truncate hidden sm:inline">Leaderboard</span>
          </TabsTrigger>
          <TabsTrigger value="simulator" className="data-[state=active]:bg-orange-600 text-xs sm:text-sm flex-1 min-w-0">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">Simulator</span>
          </TabsTrigger>
        </TabsList>

        {/* Earned Badges */}
        <TabsContent value="earned" className="space-y-6">
          <Card className="holographic-card border border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Your Achievement Collection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Boolean(userBadges) && (
                <div key="badge-display">
                  <BadgeDisplay 
                    userBadges={userBadges as any} 
                    showProgress={true} 
                    variant="grid"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Available Badges */}
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {(badgeDefinitions as any)?.map((badge: BadgeDefinition) => {
              const isEarned = (userBadges as any)?.badges?.some((b: any) => b.badgeId === badge.badgeId);
              const colors = tierColors[badge.tier];
              
              return (
                <Card 
                  key={badge.badgeId} 
                  className={`${colors.bg} border ${colors.border} ${isEarned ? 'opacity-60' : ''} transition-all hover:scale-105`}
                  data-testid={`badge-available-${badge.badgeId}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-br from-current/20 to-current/10 rounded-full w-12 h-12 flex items-center justify-center ${colors.text}`}>
                        <BadgeIcon iconName={badge.icon} tier={badge.tier} />
                      </div>
                      {isEarned && (
                        <Badge className="bg-green-900/30 text-green-400 border-green-500/30">
                          Earned
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className={`font-bold text-lg ${colors.text} mb-2`}>
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {badge.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={`${colors.bg} ${colors.text} border-none`}>
                        {badge.tier.toUpperCase()}
                      </Badge>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${colors.text}`}>
                          {badge.pointsValue} pts
                        </div>
                        {badge.frameworkId && (
                          <div className="text-xs text-gray-500">
                            {badge.frameworkId.toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Progress Tracking */}
        <TabsContent value="progress" className="space-y-6">
          <Card className="holographic-card border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <BarChart className="w-5 h-5 text-green-400" />
                <span>Badge Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(badgeProgress as any)?.filter((progress: BadgeProgress) => progress.currentProgress > 0 && !progress.isComplete).map((progress: BadgeProgress) => {
                  const badge = (badgeDefinitions as any)?.find((b: BadgeDefinition) => b.badgeId === progress.badgeId);
                  if (!badge) return null;
                  
                  const colors = tierColors[badge.tier as keyof typeof tierColors];
                  const progressPercentage = (progress.currentProgress / progress.maxProgress) * 100;
                  
                  return (
                    <div 
                      key={progress.badgeId} 
                      className={`p-4 rounded-lg ${colors.bg} border ${colors.border}`}
                      data-testid={`badge-progress-${progress.badgeId}`}
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <div className={`bg-gradient-to-br from-current/20 to-current/10 rounded-full w-10 h-10 flex items-center justify-center ${colors.text}`}>
                          <BadgeIcon iconName={badge.icon} tier={badge.tier} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${colors.text}`}>{badge.name}</h3>
                          <p className="text-sm text-gray-400">{progress.nextMilestone}</p>
                        </div>
                        <Badge className={`${colors.bg} ${colors.text} border-none`}>
                          {badge.tier.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className={colors.text}>
                            {progress.currentProgress} / {progress.maxProgress}
                          </span>
                        </div>
                        <Progress 
                          value={progressPercentage} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  );
                })}
                
                {(!badgeProgress || (badgeProgress as any)?.filter?.((p: BadgeProgress) => p.currentProgress > 0 && !p.isComplete)?.length === 0) && (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-400 mb-2">No Active Progress</h3>
                    <p className="text-sm text-gray-500">
                      Complete compliance assessments to start earning badges!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="holographic-card border border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Top Achievers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(gamificationStats as any)?.topPerformers?.map((performer: any, index: number) => (
                  <div 
                    key={performer.userId} 
                    className={`flex items-center space-x-4 p-3 rounded-lg ${
                      index === 0 ? 'bg-yellow-900/30 border border-yellow-500/30' :
                      index === 1 ? 'bg-gray-900/30 border border-gray-400/30' :
                      index === 2 ? 'bg-orange-900/30 border border-orange-500/30' :
                      'bg-surface/50 border border-surface-light'
                    }`}
                    data-testid={`leaderboard-item-${index}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      index === 2 ? 'bg-orange-500 text-orange-900' :
                      'bg-gray-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">
                        {performer.userId === user?.id ? 'You' : `User ${performer.userId.slice(-4)}`}
                      </div>
                      <div className="text-sm text-gray-400">
                        Level {performer.level} • {performer.totalBadges} badges
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{performer.totalPoints}</div>
                      <div className="text-xs text-gray-400">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Badge Simulator */}
        <TabsContent value="simulator" className="space-y-6">
          <Card className="holographic-card border border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span>Badge Simulator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Framework
                    </label>
                    <select 
                      className="w-full bg-surface border border-surface-light rounded-lg px-3 py-2 text-white"
                      value={selectedFramework}
                      onChange={(e) => setSelectedFramework(e.target.value)}
                      data-testid="select-framework"
                    >
                      <option value="ferpa">FERPA (Education)</option>
                      <option value="cipa">CIPA (Education)</option>
                      <option value="nist_csf">NIST CSF (Government)</option>
                      <option value="fedramp">FedRAMP (Government)</option>
                      <option value="cmmc">CMMC (Defense)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Assessment Score: {selectedScore}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedScore}
                      onChange={(e) => setSelectedScore(Number(e.target.value))}
                      className="w-full"
                      data-testid="score-slider"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSimulateAssessment}
                  disabled={simulateAssessment.isPending || !user?.id}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  data-testid="button-simulate-assessment"
                >
                  {simulateAssessment.isPending ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Simulating Assessment...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Simulate Assessment
                    </>
                  )}
                </Button>

                {simulateAssessment.data && (
                  <div className="mt-4 p-4 bg-green-900/30 border border-green-500/30 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2">Assessment Complete!</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      {(simulateAssessment.data as any)?.newBadgeCount > 0 
                        ? `🎉 Earned ${(simulateAssessment.data as any)?.newBadgeCount} new badge(s)!`
                        : 'No new badges earned this time. Try a higher score or different framework!'
                      }
                    </p>
                    {(simulateAssessment.data as any)?.awardedBadges?.length > 0 && (
                      <div className="text-xs text-gray-400">
                        Badges: {(simulateAssessment.data as any)?.awardedBadges.join(', ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}