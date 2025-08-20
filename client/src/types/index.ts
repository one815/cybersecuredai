export interface DashboardStats {
  threatLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  activeIncidents: number;
  protectedAssets: number;
  complianceScore: number;
  recentThreats: any[];
  networkStats: {
    bandwidth: string;
    connections: number;
    blocked: number;
  };
}

export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}
