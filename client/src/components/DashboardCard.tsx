import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  status?: "success" | "warning" | "error" | "info";
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const statusClasses = {
  success: "bg-success/20 text-success",
  warning: "bg-interactive/20 text-interactive",
  error: "bg-critical/20 text-critical",
  info: "bg-primary/20 text-secondary",
};

export function DashboardCard({ 
  title, 
  value, 
  description, 
  icon, 
  status = "info", 
  trend,
  className = "" 
}: DashboardCardProps) {
  return (
    <div className={`bg-surface rounded-xl p-6 glow-border status-indicator ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statusClasses[status]}`}>
          {icon}
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
      {trend && (
        <div className={`mt-4 flex items-center text-sm ${
          trend.isPositive ? "text-success" : "text-critical"
        }`}>
          <i className={`fas fa-arrow-${trend.isPositive ? "up" : "down"} mr-1`}></i>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
