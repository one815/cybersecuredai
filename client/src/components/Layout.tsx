import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ThreatNotificationCenter } from "./ThreatNotificationCenter";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen cyber-grid bg-background text-foreground">
      <Sidebar />
      <div className="ml-64">
        {children}
      </div>
      <ThreatNotificationCenter />
    </div>
  );
}
