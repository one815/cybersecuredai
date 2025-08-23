import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Sword
} from "lucide-react";

interface UserBadge {
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  earnedDate: Date;
  frameworkId?: string;
  achievementScore?: number;
}

interface UserBadgeCollection {
  userId: string;
  badges: UserBadge[];
  totalBadges: number;
  tierCounts: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
    diamond: number;
  };
}

interface BadgeDisplayProps {
  userBadges: UserBadgeCollection;
  showProgress?: boolean;
  limit?: number;
  variant?: "card" | "compact" | "grid";
}

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
  bronze: {
    bg: "bg-orange-900/30 border-orange-500/50",
    text: "text-orange-400",
    icon: "text-orange-400",
    gradient: "from-orange-600/20 to-orange-800/20"
  },
  silver: {
    bg: "bg-gray-900/30 border-gray-400/50",
    text: "text-gray-300",
    icon: "text-gray-300",
    gradient: "from-gray-600/20 to-gray-800/20"
  },
  gold: {
    bg: "bg-yellow-900/30 border-yellow-500/50",
    text: "text-yellow-400",
    icon: "text-yellow-400",
    gradient: "from-yellow-600/20 to-yellow-800/20"
  },
  platinum: {
    bg: "bg-cyan-900/30 border-cyan-500/50",
    text: "text-cyan-400",
    icon: "text-cyan-400",
    gradient: "from-cyan-600/20 to-cyan-800/20"
  },
  diamond: {
    bg: "bg-purple-900/30 border-purple-500/50",
    text: "text-purple-400",
    icon: "text-purple-400",
    gradient: "from-purple-600/20 to-purple-800/20"
  }
};

export default function BadgeDisplay({ 
  userBadges, 
  showProgress = false, 
  limit, 
  variant = "card" 
}: BadgeDisplayProps) {
  const BadgeIcon = ({ iconName, tier }: { iconName: string, tier: string }) => {
    const IconComponent = iconMap[iconName] || Award;
    const colors = tierColors[tier as keyof typeof tierColors];
    return <IconComponent className={`w-6 h-6 ${colors.icon}`} />;
  };

  const displayBadges = limit ? userBadges.badges.slice(0, limit) : userBadges.badges;

  if (variant === "compact") {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex -space-x-1">
          {displayBadges.slice(0, 3).map((badge) => {
            const colors = tierColors[badge.tier];
            return (
              <div
                key={badge.badgeId}
                className={`w-8 h-8 rounded-full border-2 ${colors.bg} flex items-center justify-center`}
                title={badge.name}
              >
                <BadgeIcon iconName={badge.icon} tier={badge.tier} />
              </div>
            );
          })}
          {userBadges.totalBadges > 3 && (
            <div className="w-8 h-8 rounded-full border-2 bg-gray-700 border-gray-500 flex items-center justify-center">
              <span className="text-xs text-gray-300">+{userBadges.totalBadges - 3}</span>
            </div>
          )}
        </div>
        <span className="text-sm text-gray-400">{userBadges.totalBadges} badges</span>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {displayBadges.map((badge) => {
          const colors = tierColors[badge.tier];
          return (
            <Card
              key={badge.badgeId}
              className={`${colors.bg} border transition-all hover:scale-105 cursor-pointer`}
              data-testid={`badge-${badge.badgeId}`}
            >
              <CardContent className="p-4 text-center">
                <div className={`bg-gradient-to-br ${colors.gradient} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3`}>
                  <BadgeIcon iconName={badge.icon} tier={badge.tier} />
                </div>
                <h3 className={`font-semibold text-sm ${colors.text} mb-1`}>
                  {badge.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2">
                  {badge.description}
                </p>
                <Badge className={`text-xs ${colors.bg} ${colors.text} border-none`}>
                  {badge.tier.toUpperCase()}
                </Badge>
                {badge.achievementScore && (
                  <div className="mt-2 text-xs text-gray-500">
                    Score: {badge.achievementScore}%
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <Card className="holographic-card border border-blue-500/30" data-testid="card-badge-collection">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Achievement Badges</h3>
              <p className="text-sm text-gray-400">
                {userBadges.totalBadges} badges earned
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 text-yellow-400 border-yellow-500/30">
            {userBadges.totalBadges} Total
          </Badge>
        </div>

        {/* Tier Progress */}
        {showProgress && (
          <div className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 text-center">
              {Object.entries(userBadges.tierCounts).map(([tier, count]) => {
                const colors = tierColors[tier as keyof typeof tierColors];
                return (
                  <div key={tier} className={`p-1 sm:p-2 rounded-lg ${colors.bg} border`}>
                    <div className={`text-sm sm:text-lg font-bold ${colors.text}`}>{count}</div>
                    <div className="text-xs text-gray-400 capitalize">{tier}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Badges */}
        {displayBadges.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-400 mb-3">
              {limit ? "Recent Badges" : "All Badges"}
            </h4>
            {displayBadges.map((badge) => {
              const colors = tierColors[badge.tier];
              return (
                <div
                  key={badge.badgeId}
                  className={`flex items-center space-x-2 sm:space-x-4 p-2 sm:p-3 rounded-lg ${colors.bg} border transition-all hover:scale-[1.02]`}
                  data-testid={`badge-item-${badge.badgeId}`}
                >
                  <div className={`bg-gradient-to-br ${colors.gradient} rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0`}>
                    <BadgeIcon iconName={badge.icon} tier={badge.tier} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold ${colors.text} text-sm sm:text-base truncate`}>{badge.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 sm:line-clamp-none">{badge.description}</p>
                    <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                      <Badge className={`text-xs ${colors.bg} ${colors.text} border-none`}>
                        {badge.tier.toUpperCase()}
                      </Badge>
                      {badge.frameworkId && (
                        <Badge className="text-xs bg-blue-900/30 text-blue-400 border-blue-500/30">
                          {badge.frameworkId.toUpperCase()}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {badge.achievementScore && (
                      <div className={`text-xs sm:text-sm font-bold ${colors.text}`}>
                        {badge.achievementScore}%
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {new Date(badge.earnedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No Badges Yet</h3>
            <p className="text-sm text-gray-500">
              Complete compliance assessments to earn achievement badges!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}