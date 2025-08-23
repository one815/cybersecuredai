import { EventEmitter } from 'events';

export interface BadgeDefinition {
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  category: 'framework_completion' | 'multi_framework' | 'improvement' | 'streak' | 'special';
  frameworkId?: string;
  criteria: BadgeCriteria;
  pointsValue: number;
}

export interface BadgeCriteria {
  frameworkId?: string;
  minScore?: number;
  maxScore?: number;
  improvementPoints?: number;
  streakDays?: number;
  minFrameworks?: number;
  specificFrameworks?: string[];
  assessmentCount?: number;
  timeFrame?: number; // days
  consecutiveScores?: number[];
}

export interface UserBadgeProgress {
  userId: string;
  badgeId: string;
  currentProgress: number;
  maxProgress: number;
  isComplete: boolean;
  nextMilestone?: string;
}

export interface ComplianceAssessment {
  userId: string;
  frameworkId: string;
  score: number;
  previousScore?: number;
  assessmentDate: Date;
  improvements: string[];
}

export interface GamificationStats {
  totalUsers: number;
  totalBadgesAwarded: number;
  topPerformers: Array<{
    userId: string;
    totalBadges: number;
    totalPoints: number;
    level: number;
  }>;
  badgeDistribution: Record<string, number>;
  recentAchievements: Array<{
    userId: string;
    badgeId: string;
    earnedDate: Date;
  }>;
}

/**
 * Gamification Engine for Compliance Achievement Badges
 * Manages badge definitions, milestone tracking, and achievement rewards
 */
export class GamificationEngine extends EventEmitter {
  private badgeDefinitions: Map<string, BadgeDefinition> = new Map();
  private userStats: Map<string, any> = new Map();
  private recentAssessments: ComplianceAssessment[] = [];
  
  constructor() {
    super();
    this.initializeBadgeDefinitions();
  }

  private initializeBadgeDefinitions(): void {
    const badges: BadgeDefinition[] = [
      // Education Sector Badges
      {
        badgeId: 'ferpa_bronze',
        name: 'FERPA Explorer',
        description: 'Complete your first FERPA compliance assessment',
        icon: 'graduation-cap',
        tier: 'bronze',
        category: 'framework_completion',
        frameworkId: 'ferpa',
        criteria: { frameworkId: 'ferpa', minScore: 50 },
        pointsValue: 100
      },
      {
        badgeId: 'ferpa_silver',
        name: 'FERPA Guardian',
        description: 'Achieve 80%+ FERPA compliance score',
        icon: 'shield-check',
        tier: 'silver',
        category: 'framework_completion',
        frameworkId: 'ferpa',
        criteria: { frameworkId: 'ferpa', minScore: 80 },
        pointsValue: 250
      },
      {
        badgeId: 'ferpa_gold',
        name: 'FERPA Champion',
        description: 'Achieve 95%+ FERPA compliance score',
        icon: 'crown',
        tier: 'gold',
        category: 'framework_completion',
        frameworkId: 'ferpa',
        criteria: { frameworkId: 'ferpa', minScore: 95 },
        pointsValue: 500
      },
      {
        badgeId: 'cipa_bronze',
        name: 'CIPA Protector',
        description: 'Complete your first CIPA compliance assessment',
        icon: 'shield',
        tier: 'bronze',
        category: 'framework_completion',
        frameworkId: 'cipa',
        criteria: { frameworkId: 'cipa', minScore: 50 },
        pointsValue: 100
      },
      {
        badgeId: 'cipa_silver',
        name: 'CIPA Defender',
        description: 'Achieve 80%+ CIPA compliance score',
        icon: 'shield-alert',
        tier: 'silver',
        category: 'framework_completion',
        frameworkId: 'cipa',
        criteria: { frameworkId: 'cipa', minScore: 80 },
        pointsValue: 250
      },
      {
        badgeId: 'cipa_gold',
        name: 'CIPA Master',
        description: 'Achieve 95%+ CIPA compliance score',
        icon: 'star',
        tier: 'gold',
        category: 'framework_completion',
        frameworkId: 'cipa',
        criteria: { frameworkId: 'cipa', minScore: 95 },
        pointsValue: 500
      },

      // Government Sector Badges
      {
        badgeId: 'nist_bronze',
        name: 'NIST Novice',
        description: 'Complete your first NIST Cybersecurity Framework assessment',
        icon: 'building',
        tier: 'bronze',
        category: 'framework_completion',
        frameworkId: 'nist_csf',
        criteria: { frameworkId: 'nist_csf', minScore: 50 },
        pointsValue: 120
      },
      {
        badgeId: 'nist_silver',
        name: 'NIST Specialist',
        description: 'Achieve 80%+ NIST CSF compliance score',
        icon: 'target',
        tier: 'silver',
        category: 'framework_completion',
        frameworkId: 'nist_csf',
        criteria: { frameworkId: 'nist_csf', minScore: 80 },
        pointsValue: 300
      },
      {
        badgeId: 'nist_gold',
        name: 'NIST Expert',
        description: 'Achieve 95%+ NIST CSF compliance score',
        icon: 'award',
        tier: 'gold',
        category: 'framework_completion',
        frameworkId: 'nist_csf',
        criteria: { frameworkId: 'nist_csf', minScore: 95 },
        pointsValue: 600
      },
      {
        badgeId: 'fedramp_bronze',
        name: 'FedRAMP Starter',
        description: 'Complete your first FedRAMP compliance assessment',
        icon: 'cloud',
        tier: 'bronze',
        category: 'framework_completion',
        frameworkId: 'fedramp',
        criteria: { frameworkId: 'fedramp', minScore: 50 },
        pointsValue: 150
      },
      {
        badgeId: 'fedramp_silver',
        name: 'FedRAMP Practitioner',
        description: 'Achieve 80%+ FedRAMP compliance score',
        icon: 'zap',
        tier: 'silver',
        category: 'framework_completion',
        frameworkId: 'fedramp',
        criteria: { frameworkId: 'fedramp', minScore: 80 },
        pointsValue: 350
      },
      {
        badgeId: 'fedramp_gold',
        name: 'FedRAMP Authority',
        description: 'Achieve 95%+ FedRAMP compliance score',
        icon: 'crown',
        tier: 'gold',
        category: 'framework_completion',
        frameworkId: 'fedramp',
        criteria: { frameworkId: 'fedramp', minScore: 95 },
        pointsValue: 700
      },

      // Defense/Federal Badges
      {
        badgeId: 'cmmc_bronze',
        name: 'CMMC Candidate',
        description: 'Complete your first CMMC assessment',
        icon: 'sword',
        tier: 'bronze',
        category: 'framework_completion',
        frameworkId: 'cmmc',
        criteria: { frameworkId: 'cmmc', minScore: 50 },
        pointsValue: 200
      },
      {
        badgeId: 'cmmc_silver',
        name: 'CMMC Certified',
        description: 'Achieve 80%+ CMMC compliance score',
        icon: 'shield-check',
        tier: 'silver',
        category: 'framework_completion',
        frameworkId: 'cmmc',
        criteria: { frameworkId: 'cmmc', minScore: 80 },
        pointsValue: 400
      },
      {
        badgeId: 'cmmc_gold',
        name: 'CMMC Elite',
        description: 'Achieve 95%+ CMMC compliance score',
        icon: 'trophy',
        tier: 'gold',
        category: 'framework_completion',
        frameworkId: 'cmmc',
        criteria: { frameworkId: 'cmmc', minScore: 95 },
        pointsValue: 800
      },

      // Multi-Framework Achievement Badges
      {
        badgeId: 'education_master',
        name: 'Education Compliance Master',
        description: 'Achieve 80%+ in both FERPA and CIPA frameworks',
        icon: 'graduation-cap',
        tier: 'platinum',
        category: 'multi_framework',
        criteria: { 
          specificFrameworks: ['ferpa', 'cipa'],
          minScore: 80
        },
        pointsValue: 1000
      },
      {
        badgeId: 'government_expert',
        name: 'Government Security Expert',
        description: 'Achieve 80%+ in NIST CSF and FedRAMP frameworks',
        icon: 'building',
        tier: 'platinum',
        category: 'multi_framework',
        criteria: { 
          specificFrameworks: ['nist_csf', 'fedramp'],
          minScore: 80
        },
        pointsValue: 1200
      },
      {
        badgeId: 'compliance_virtuoso',
        name: 'Compliance Virtuoso',
        description: 'Achieve 90%+ in 5 different compliance frameworks',
        icon: 'crown',
        tier: 'diamond',
        category: 'multi_framework',
        criteria: { 
          minFrameworks: 5,
          minScore: 90
        },
        pointsValue: 2000
      },

      // Improvement Badges
      {
        badgeId: 'rapid_improver',
        name: 'Rapid Improver',
        description: 'Improve any framework score by 20+ points in one assessment',
        icon: 'trending-up',
        tier: 'silver',
        category: 'improvement',
        criteria: { improvementPoints: 20 },
        pointsValue: 300
      },
      {
        badgeId: 'transformation_leader',
        name: 'Transformation Leader',
        description: 'Improve any framework score by 40+ points in one assessment',
        icon: 'refresh-cw',
        tier: 'gold',
        category: 'improvement',
        criteria: { improvementPoints: 40 },
        pointsValue: 600
      },
      {
        badgeId: 'excellence_achiever',
        name: 'Excellence Achiever',
        description: 'Achieve perfect 100% score in any framework',
        icon: 'star',
        tier: 'platinum',
        category: 'framework_completion',
        criteria: { minScore: 100 },
        pointsValue: 1500
      },

      // Streak and Consistency Badges
      {
        badgeId: 'consistent_performer',
        name: 'Consistent Performer',
        description: 'Complete assessments for 7 consecutive days',
        icon: 'repeat',
        tier: 'bronze',
        category: 'streak',
        criteria: { streakDays: 7 },
        pointsValue: 200
      },
      {
        badgeId: 'dedication_champion',
        name: 'Dedication Champion',
        description: 'Complete assessments for 30 consecutive days',
        icon: 'play-circle',
        tier: 'gold',
        category: 'streak',
        criteria: { streakDays: 30 },
        pointsValue: 800
      }
    ];

    badges.forEach(badge => {
      this.badgeDefinitions.set(badge.badgeId, badge);
    });

    console.log(`🎯 Gamification Engine: Initialized ${badges.length} achievement badges`);
  }

  /**
   * Process a compliance assessment and award appropriate badges
   */
  public async processAssessment(assessment: ComplianceAssessment): Promise<string[]> {
    try {
      this.recentAssessments.push(assessment);
      
      // Keep only last 1000 assessments
      if (this.recentAssessments.length > 1000) {
        this.recentAssessments = this.recentAssessments.slice(-1000);
      }

      const awardedBadges: string[] = [];

      // Check all badge criteria
      for (const [badgeId, badgeDefinition] of Array.from(this.badgeDefinitions)) {
        if (await this.checkBadgeCriteria(assessment, badgeDefinition)) {
          awardedBadges.push(badgeId);
          
          // Emit badge earned event
          this.emit('badgeEarned', {
            userId: assessment.userId,
            badgeId,
            badgeName: badgeDefinition.name,
            tier: badgeDefinition.tier,
            pointsValue: badgeDefinition.pointsValue,
            assessmentScore: assessment.score,
            frameworkId: assessment.frameworkId
          });
        }
      }

      // Update user stats
      if (awardedBadges.length > 0) {
        await this.updateUserStats(assessment.userId, awardedBadges);
      }

      return awardedBadges;
    } catch (error) {
      console.error('Error processing assessment for badges:', error);
      return [];
    }
  }

  /**
   * Check if a badge criteria is met
   */
  private async checkBadgeCriteria(
    assessment: ComplianceAssessment, 
    badge: BadgeDefinition
  ): Promise<boolean> {
    const criteria = badge.criteria;

    // Framework-specific badges
    if (criteria.frameworkId && criteria.frameworkId !== assessment.frameworkId) {
      return false;
    }

    // Score requirements
    if (criteria.minScore && assessment.score < criteria.minScore) {
      return false;
    }

    if (criteria.maxScore && assessment.score > criteria.maxScore) {
      return false;
    }

    // Improvement requirements
    if (criteria.improvementPoints && assessment.previousScore !== undefined) {
      const improvement = assessment.score - assessment.previousScore;
      if (improvement < criteria.improvementPoints) {
        return false;
      }
    }

    // Multi-framework requirements
    if (criteria.specificFrameworks && criteria.specificFrameworks.length > 0) {
      return this.checkMultiFrameworkCriteria(assessment.userId, criteria);
    }

    if (criteria.minFrameworks) {
      return this.checkMinFrameworksCriteria(assessment.userId, criteria);
    }

    // Streak requirements (simplified for now)
    if (criteria.streakDays) {
      return this.checkStreakCriteria(assessment.userId, criteria.streakDays);
    }

    // If no specific criteria failed, badge is earned
    return true;
  }

  /**
   * Check multi-framework criteria
   */
  private checkMultiFrameworkCriteria(userId: string, criteria: BadgeCriteria): boolean {
    if (!criteria.specificFrameworks || !criteria.minScore) return false;

    const userAssessments = this.recentAssessments.filter(a => a.userId === userId);
    const frameworkScores = new Map<string, number>();

    // Get the highest score for each framework
    userAssessments.forEach(assessment => {
      const currentScore = frameworkScores.get(assessment.frameworkId) || 0;
      if (assessment.score > currentScore) {
        frameworkScores.set(assessment.frameworkId, assessment.score);
      }
    });

    // Check if all required frameworks meet the minimum score
    return criteria.specificFrameworks.every(frameworkId => {
      const score = frameworkScores.get(frameworkId) || 0;
      return score >= criteria.minScore!;
    });
  }

  /**
   * Check minimum frameworks criteria
   */
  private checkMinFrameworksCriteria(userId: string, criteria: BadgeCriteria): boolean {
    if (!criteria.minFrameworks || !criteria.minScore) return false;

    const userAssessments = this.recentAssessments.filter(a => a.userId === userId);
    const frameworkScores = new Map<string, number>();

    // Get the highest score for each framework
    userAssessments.forEach(assessment => {
      const currentScore = frameworkScores.get(assessment.frameworkId) || 0;
      if (assessment.score > currentScore) {
        frameworkScores.set(assessment.frameworkId, assessment.score);
      }
    });

    // Count frameworks that meet the minimum score
    const qualifyingFrameworks = Array.from(frameworkScores.values())
      .filter(score => score >= criteria.minScore!).length;

    return qualifyingFrameworks >= criteria.minFrameworks;
  }

  /**
   * Check streak criteria (simplified)
   */
  private checkStreakCriteria(userId: string, requiredDays: number): boolean {
    const userAssessments = this.recentAssessments
      .filter(a => a.userId === userId)
      .sort((a, b) => b.assessmentDate.getTime() - a.assessmentDate.getTime());

    if (userAssessments.length < requiredDays) return false;

    // Simplified streak check - at least one assessment per day for required days
    const uniqueDays = new Set(
      userAssessments.slice(0, requiredDays)
        .map(a => a.assessmentDate.toDateString())
    );

    return uniqueDays.size >= requiredDays;
  }

  /**
   * Update user achievement statistics
   */
  private async updateUserStats(userId: string, awardedBadges: string[]): Promise<void> {
    let userStats = this.userStats.get(userId) || {
      userId,
      totalBadges: 0,
      totalPoints: 0,
      bronzeBadges: 0,
      silverBadges: 0,
      goldBadges: 0,
      platinumBadges: 0,
      diamondBadges: 0,
      level: 1,
      badges: []
    };

    for (const badgeId of awardedBadges) {
      const badge = this.badgeDefinitions.get(badgeId);
      if (!badge) continue;

      userStats.totalBadges++;
      userStats.totalPoints += badge.pointsValue;
      userStats.badges.push({
        badgeId: badgeId,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        tier: badge.tier,
        frameworkId: badge.frameworkId,
        pointsValue: badge.pointsValue,
        earnedDate: new Date()
      });

      // Update tier counts
      switch (badge.tier) {
        case 'bronze': userStats.bronzeBadges++; break;
        case 'silver': userStats.silverBadges++; break;
        case 'gold': userStats.goldBadges++; break;
        case 'platinum': userStats.platinumBadges++; break;
        case 'diamond': userStats.diamondBadges++; break;
      }
    }

    // Calculate level based on total points
    userStats.level = Math.floor(userStats.totalPoints / 1000) + 1;

    this.userStats.set(userId, userStats);
  }

  /**
   * Get user badge collection
   */
  public getUserBadges(userId: string): any {
    const userStats = this.userStats.get(userId) || {
      userId,
      totalBadges: 0,
      totalPoints: 0,
      bronzeBadges: 0,
      silverBadges: 0,
      goldBadges: 0,
      platinumBadges: 0,
      diamondBadges: 0,
      level: 1,
      badges: []
    };

    return {
      userId,
      badges: userStats.badges || [],
      totalBadges: userStats.totalBadges || 0,
      totalPoints: userStats.totalPoints || 0,
      level: userStats.level || 1,
      tierCounts: {
        bronze: userStats.bronzeBadges || 0,
        silver: userStats.silverBadges || 0,
        gold: userStats.goldBadges || 0,
        platinum: userStats.platinumBadges || 0,
        diamond: userStats.diamondBadges || 0
      }
    };
  }

  /**
   * Get all available badge definitions
   */
  public getAllBadgeDefinitions(): BadgeDefinition[] {
    return Array.from(this.badgeDefinitions.values());
  }

  /**
   * Get badge progress for a user
   */
  public getUserBadgeProgress(userId: string): UserBadgeProgress[] {
    const progress: UserBadgeProgress[] = [];
    const userAssessments = this.recentAssessments.filter(a => a.userId === userId);
    const userBadges = this.getUserBadges(userId);
    const earnedBadgeIds = new Set(userBadges.badges.map((b: any) => b.badgeId));

    for (const [badgeId, badge] of Array.from(this.badgeDefinitions)) {
      if (earnedBadgeIds.has(badgeId)) continue; // Skip already earned badges

      const progressInfo = this.calculateBadgeProgress(userId, badge, userAssessments);
      progress.push({
        userId,
        badgeId,
        currentProgress: progressInfo.current,
        maxProgress: progressInfo.max,
        isComplete: progressInfo.current >= progressInfo.max,
        nextMilestone: progressInfo.nextMilestone
      });
    }

    return progress.filter(p => p.currentProgress > 0); // Only show badges with some progress
  }

  /**
   * Calculate progress towards a specific badge
   */
  private calculateBadgeProgress(
    userId: string, 
    badge: BadgeDefinition, 
    userAssessments: ComplianceAssessment[]
  ): { current: number; max: number; nextMilestone?: string } {
    const criteria = badge.criteria;

    // Framework completion badges
    if (criteria.frameworkId && criteria.minScore) {
      const frameworkAssessments = userAssessments.filter(a => a.frameworkId === criteria.frameworkId);
      const bestScore = Math.max(...frameworkAssessments.map(a => a.score), 0);
      
      return {
        current: Math.min(bestScore, criteria.minScore),
        max: criteria.minScore,
        nextMilestone: `Reach ${criteria.minScore}% in ${criteria.frameworkId.toUpperCase()}`
      };
    }

    // Multi-framework badges
    if (criteria.specificFrameworks && criteria.minScore) {
      const frameworkScores = new Map<string, number>();
      userAssessments.forEach(assessment => {
        const currentScore = frameworkScores.get(assessment.frameworkId) || 0;
        if (assessment.score > currentScore) {
          frameworkScores.set(assessment.frameworkId, assessment.score);
        }
      });

      const qualifyingFrameworks = criteria.specificFrameworks.filter(frameworkId => {
        const score = frameworkScores.get(frameworkId) || 0;
        return score >= criteria.minScore!;
      }).length;

      return {
        current: qualifyingFrameworks,
        max: criteria.specificFrameworks.length,
        nextMilestone: `Complete ${criteria.specificFrameworks.length - qualifyingFrameworks} more framework(s)`
      };
    }

    return { current: 0, max: 1 };
  }

  /**
   * Get gamification statistics
   */
  public getGamificationStats(): GamificationStats {
    const allUsers = Array.from(this.userStats.values());
    const topPerformers = allUsers
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 10)
      .map(user => ({
        userId: user.userId,
        totalBadges: user.totalBadges,
        totalPoints: user.totalPoints,
        level: user.level
      }));

    const badgeDistribution: Record<string, number> = {};
    Array.from(this.badgeDefinitions.keys()).forEach(badgeId => {
      badgeDistribution[badgeId] = allUsers.reduce((count, user) => {
        return count + (user.badges?.filter((b: any) => b.badgeId === badgeId).length || 0);
      }, 0);
    });

    const recentAchievements = allUsers
      .flatMap(user => (user.badges || []).map((badge: any) => ({
        userId: user.userId,
        badgeId: badge.badgeId,
        earnedDate: badge.earnedDate
      })))
      .sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
      .slice(0, 20);

    return {
      totalUsers: allUsers.length,
      totalBadgesAwarded: allUsers.reduce((sum, user) => sum + user.totalBadges, 0),
      topPerformers,
      badgeDistribution,
      recentAchievements
    };
  }

  /**
   * Simulate compliance assessment to demonstrate badge system
   */
  public async simulateAssessment(userId: string, frameworkId: string, score: number, previousScore?: number): Promise<string[]> {
    const assessment: ComplianceAssessment = {
      userId,
      frameworkId,
      score,
      previousScore,
      assessmentDate: new Date(),
      improvements: []
    };

    return await this.processAssessment(assessment);
  }
}