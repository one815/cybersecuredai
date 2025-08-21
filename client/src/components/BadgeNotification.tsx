import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Award, 
  Star, 
  X,
  Sparkles 
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

interface BadgeNotificationProps {
  newBadges: UserBadge[];
  onDismiss: () => void;
}

const tierColors = {
  bronze: {
    bg: "from-orange-600/30 to-orange-800/30",
    border: "border-orange-500/50",
    text: "text-orange-400",
    glow: "shadow-orange-500/20"
  },
  silver: {
    bg: "from-gray-600/30 to-gray-800/30",
    border: "border-gray-400/50",
    text: "text-gray-300",
    glow: "shadow-gray-400/20"
  },
  gold: {
    bg: "from-yellow-600/30 to-yellow-800/30",
    border: "border-yellow-500/50",
    text: "text-yellow-400",
    glow: "shadow-yellow-500/20"
  },
  platinum: {
    bg: "from-cyan-600/30 to-cyan-800/30",
    border: "border-cyan-500/50",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20"
  },
  diamond: {
    bg: "from-purple-600/30 to-purple-800/30",
    border: "border-purple-500/50",
    text: "text-purple-400",
    glow: "shadow-purple-500/20"
  }
};

export default function BadgeNotification({ newBadges, onDismiss }: BadgeNotificationProps) {
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (newBadges.length === 0) return;

    // Auto-dismiss after 8 seconds or when all badges are shown
    const timer = setTimeout(() => {
      if (currentBadgeIndex >= newBadges.length - 1) {
        setIsVisible(false);
        setTimeout(onDismiss, 500);
      } else {
        setCurrentBadgeIndex(currentBadgeIndex + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentBadgeIndex, newBadges.length, onDismiss]);

  if (newBadges.length === 0 || !isVisible) return null;

  const currentBadge = newBadges[currentBadgeIndex];
  const colors = tierColors[currentBadge.tier];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -100 }}
          className="fixed top-20 right-6 z-50 max-w-sm"
          data-testid="badge-notification"
        >
          <Card className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} ${colors.glow} shadow-2xl overflow-hidden`}>
            <CardContent className="p-0">
              {/* Header with sparkles animation */}
              <div className="relative bg-gradient-to-r from-black/40 to-transparent p-4">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="absolute top-2 right-2"
                >
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </motion.div>
                
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-12 h-12 bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-full flex items-center justify-center`}
                  >
                    <Trophy className={`w-8 h-8 ${colors.text}`} />
                  </motion.div>
                  
                  <div>
                    <motion.h3 
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      className={`text-lg font-bold ${colors.text}`}
                    >
                      🎉 Badge Earned!
                    </motion.h3>
                    <motion.p 
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm text-gray-300"
                    >
                      Achievement Unlocked
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Badge Details */}
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        `0 0 0 ${colors.glow}`,
                        `0 0 20px ${colors.glow}`,
                        `0 0 0 ${colors.glow}`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-16 h-16 bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <Award className={`w-10 h-10 ${colors.text}`} />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg ${colors.text} mb-1`}>
                      {currentBadge.name}
                    </h4>
                    <p className="text-sm text-gray-300 mb-2">
                      {currentBadge.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={`${colors.bg} ${colors.text} border-none text-xs font-bold`}>
                        {currentBadge.tier.toUpperCase()}
                      </Badge>
                      
                      {currentBadge.achievementScore && (
                        <div className={`text-sm font-bold ${colors.text}`}>
                          {currentBadge.achievementScore}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress indicator for multiple badges */}
                {newBadges.length > 1 && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-1">
                      {newBadges.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentBadgeIndex 
                              ? colors.text.replace('text-', 'bg-')
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400">
                      {currentBadgeIndex + 1} of {newBadges.length}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsVisible(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Dismiss
                  </Button>
                  
                  {newBadges.length > 1 && currentBadgeIndex < newBadges.length - 1 && (
                    <Button
                      size="sm"
                      onClick={() => setCurrentBadgeIndex(currentBadgeIndex + 1)}
                      className={`bg-gradient-to-r ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      Next Badge
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}